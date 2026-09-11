import { NextResponse } from "next/server";

export const runtime = "edge";

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

export async function POST(request: Request) {
  const webhook = process.env.FEISHU_WEBHOOK_URL?.trim();
  if (!webhook) {
    return NextResponse.json(
      { ok: false, error: "通知通道未配置，请直接添加微信咨询。" },
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
    return NextResponse.json({ ok: false, error: "工程类型无效" }, { status: 400 });
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

  const secret = process.env.FEISHU_WEBHOOK_SECRET?.trim();
  if (secret) {
    const timestamp = String(Math.floor(Date.now() / 1000));
    payload.timestamp = timestamp;
    payload.sign = await feishuSign(secret, timestamp);
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const detail = await res.text();
    let parsed: { code?: number; msg?: string } = {};
    try {
      parsed = JSON.parse(detail) as { code?: number; msg?: string };
    } catch {
      /* ignore */
    }

    // 飞书成功一般为 HTTP 200 且 code === 0
    if (!res.ok || (typeof parsed.code === "number" && parsed.code !== 0)) {
      console.error("feishu webhook failed", res.status, detail);
      return NextResponse.json(
        { ok: false, error: "发送失败，请稍后再试或直接添加微信。" },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("feishu webhook error", error);
    return NextResponse.json(
      { ok: false, error: "网络异常，请稍后再试或直接添加微信。" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
