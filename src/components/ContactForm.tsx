"use client";

import { useState } from "react";
import { site } from "@/content/site";

const types = ["彩绘", "壁画", "塑像", "修缮", "综合工程", "其他"] as const;

const fieldClass =
  "min-h-12 w-full border border-paper/15 bg-hall-deep px-3 text-base text-paper outline-none placeholder:text-paper/25 focus:border-oldgold/50";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      contact: String(data.get("contact") || ""),
      type: String(data.get("type") || ""),
      location: String(data.get("location") || ""),
      message: String(data.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !result?.ok) {
        setError(result?.error || "提交失败，请稍后再试。");
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError("网络异常，请稍后再试或直接添加微信。");
    } finally {
      setPending(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-oldgold/25 bg-hall-deep px-5 py-8 text-sm leading-relaxed text-paper/55 sm:px-6">
        <p className="font-display text-lg text-paper">已收到，我们尽快回复</p>
        <p className="mt-2">
          也可直接添加微信{" "}
          <span className="text-oldgold">{site.wechat}</span>
          ，沟通往往更快。
        </p>
        <button
          type="button"
          className="mt-6 text-sm tracking-wider text-oldgold underline-offset-4 hover:underline"
          onClick={() => setSubmitted(false)}
        >
          再留一条
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="称呼" name="name" required placeholder="如何称呼您" />
      <Field
        label="电话 / 微信"
        name="contact"
        required
        placeholder="方便回复的联系方式"
      />
      <div>
        <label htmlFor="type" className="mb-2 block text-sm text-paper/70">
          工程类型
        </label>
        <select
          id="type"
          name="type"
          required
          className={fieldClass}
          defaultValue=""
        >
          <option value="" disabled>
            请选择
          </option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <Field label="大致地点" name="location" placeholder="省市 / 区县即可" />
      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-paper/70">
          一句话需求
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="例如：正殿梁枋彩绘 / 殿壁壁画，约三间，希望了解工期与能否驻场"
          className={`${fieldClass} py-3`}
        />
      </div>
      {error ? (
        <p className="text-sm leading-relaxed text-cinnabar" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="flex min-h-12 w-full items-center justify-center bg-cinnabar px-5 text-sm tracking-wider text-paper transition-colors hover:bg-cinnabar-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? "提交中…" : "提交咨询"}
      </button>
      <p className="text-xs leading-relaxed text-paper/35">
        提交后我们会在飞书收到提醒。更快捷的方式是添加微信 {site.wechat}。
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-paper/70">
        {label}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className={fieldClass}
      />
    </div>
  );
}
