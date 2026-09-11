import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  contact?: string;
  type?: string;
  location?: string;
  message?: string;
};

const TYPES = new Set(["彩绘", "壁画", "塑像", "修缮", "综合工程", "其他"]);

function trim(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function readProcessEnv(name: string): string | undefined {
  try {
    if (typeof process === "undefined" || !process.env) return undefined;
    const value = process.env[name];
    if (typeof value !== "string") return undefined;
    const trimmed = value.trim();
    return trimmed || undefined;
  } catch {
    return undefined;
  }
}

async function readEnv(name: string): Promise<string | undefined> {
  return readProcessEnv(name);
}

async function feishuSign(secret: string, timestamp: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${timestamp}\n${secret}`),
  );
  const bytes = new Uint8Array(signature);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function isFeishuOk(status: number, body: string) {
  if (status < 200 || status >= 300) return false;
  if (!body) return true;
  try {
    const parsed = JSON.parse(body) as {
      code?: number;
      StatusCode?: number;
      msg?: string;
    };
    if (typeof parsed.code === "number") return parsed.code === 0;
    if (typeof parsed.StatusCode === "number") return parsed.StatusCode === 0;
    return true;
  } catch {
    return true;
  }
}

export async function POST(request: Request) {
  try {
    const webhook = await readEnv("FEISHU_WEBHOOK_URL");
    if (!webhook) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "通知通道未配置。请在 Cloudflare 运行时变量中设置 FEISHU_WEBHOOK_URL，或直接添加微信咨询。",
        },
        { status: 503 },
      );
    }

    let raw: ContactBody;
    try {
      raw = (await request.json()) as ContactBody;
    } catch {
      return NextResponse.json({ ok: false, error: "请求无效" }, { status: 400 });
    }

    const name = trim(raw.name, 40);
    const contact = trim(raw.contact, 60);
    const type = trim(raw.type, 20);
    const location = trim(raw.location, 80);
    const message = trim(raw.message, 800);

    if (!name || !contact || !type || !message) {
      return NextResponse.json(
        { ok: false, error: "请完整填写称呼、联系方式、类型与需求。" },
        { status: 400 },
      );
    }
    if (!TYPES.has(type)) {
      return NextResponse.json(
        { ok: false, error: "工程类型无效" },
        { status: 400 },
      );
    }

    const text = [
      "【吉彩古建】新咨询",
      `称呼：${name}`,
      `电话/微信：${contact}`,
      `工程类型：${type}`,
      `大致地点：${location || "未填写"}`,
      `需求说明：${message}`,
    ].join("\n");

    const payload: Record<string, unknown> = {
      msg_type: "text",
      content: { text },
    };

    const secret = await readEnv("FEISHU_WEBHOOK_SECRET");
    if (secret) {
      const timestamp = String(Math.floor(Date.now() / 1000));
      payload.timestamp = timestamp;
      payload.sign = await feishuSign(secret, timestamp);
    }

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const detail = await res.text();

    if (!isFeishuOk(res.status, detail)) {
      console.error("feishu webhook failed", res.status, detail.slice(0, 300));
      return NextResponse.json(
        { ok: false, error: "发送失败，请稍后再试或直接添加微信。" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact api error", error);
    return NextResponse.json(
      { ok: false, error: "服务异常，请稍后再试或直接添加微信。" },
      { status: 500 },
    );
  }
}
