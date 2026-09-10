"use client";

import { useState } from "react";
import { site } from "@/content/site";

const types = ["彩绘", "壁画", "塑像", "修缮", "综合工程", "其他"] as const;

const fieldClass =
  "min-h-12 w-full border border-paper/15 bg-hall-deep px-3 text-base text-paper outline-none placeholder:text-paper/25 focus:border-oldgold/50";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const contact = String(data.get("contact") || "");
    const type = String(data.get("type") || "");
    const location = String(data.get("location") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(`吉彩古建工程咨询 - ${name || "客户"}`);
    const body = encodeURIComponent(
      [
        `称呼：${name}`,
        `电话/微信：${contact}`,
        `工程类型：${type}`,
        `大致地点：${location}`,
        `需求说明：${message}`,
      ].join("\n"),
    );

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-oldgold/25 bg-hall-deep px-5 py-8 text-sm leading-relaxed text-paper/55 sm:px-6">
        <p className="font-display text-lg text-paper">已打开邮件草稿</p>
        <p className="mt-2">
          若未自动跳转，也可直接添加微信{" "}
          <span className="text-oldgold">{site.wechat}</span>，或拨打{" "}
          <a
            className="text-oldgold underline-offset-2 hover:underline"
            href={`tel:${site.phone.replace(/-/g, "")}`}
          >
            {site.phone}
          </a>
          。
        </p>
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
      <button
        type="submit"
        className="flex min-h-12 w-full items-center justify-center bg-cinnabar px-5 text-sm tracking-wider text-paper transition-colors hover:bg-cinnabar-hover sm:w-auto"
      >
        提交咨询
      </button>
      <p className="text-xs leading-relaxed text-paper/35">
        提交将打开邮件客户端。更快捷的方式是添加微信 {site.wechat}。
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
