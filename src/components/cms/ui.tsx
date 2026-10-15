import { publicMediaUrl } from "@/lib/media";

export function PageTitle({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#CE6A73]">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-1 font-serif text-[1.85rem] sm:text-[2.2rem] font-medium tracking-tight text-[#292022]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 text-[13px] text-[#7A6B6E] max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#F3E2E4] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(206,106,115,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  textarea,
  rows = 4,
  required,
  placeholder,
  helperText,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  textarea?: boolean;
  rows?: number;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
}) {
  return (
    <div>
      <label
        className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]"
        htmlFor={name}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue ?? ""}
          className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px] text-[#292022] placeholder:text-[#A8989B] outline-none transition-all focus:border-[#CE6A73] focus:ring-2 focus:ring-[#CE6A73]/15"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue ?? ""}
          className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px] text-[#292022] placeholder:text-[#A8989B] outline-none transition-all focus:border-[#CE6A73] focus:ring-2 focus:ring-[#CE6A73]/15"
        />
      )}
      {helperText && (
        <p className="mt-1 text-[11px] text-[#9C8D90] leading-relaxed">
          {helperText}
        </p>
      )}
    </div>
  );
}

export function Check({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-[#292022] cursor-pointer select-none">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-[#EED7DA] text-[#CE6A73] focus:ring-[#CE6A73]/20 accent-[#CE6A73]"
      />
      <span>{label}</span>
    </label>
  );
}

export function SaveButton({
  label = "Save Changes",
  disabled,
}: {
  label?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="inline-flex items-center justify-center rounded-full bg-[#CE6A73] px-6 py-2.5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-[#B85860] disabled:opacity-50"
    >
      {label}
    </button>
  );
}

export function StatusBadge({
  published,
  label,
}: {
  published?: boolean;
  label?: string;
}) {
  if (published) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C8E6C9]/60 bg-[#EAF7EE] px-2.5 py-0.5 text-[11px] font-semibold text-[#2E7D32]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D32]" />
        {label || "Published"}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FFE0B2]/60 bg-[#FFF3E0] px-2.5 py-0.5 text-[11px] font-semibold text-[#D84315]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#D84315]" />
      {label || "Draft"}
    </span>
  );
}

export function Preview({
  path,
  alt,
}: {
  path?: string | null;
  alt: string;
}) {
  const src = publicMediaUrl(path);
  if (!src) {
    return (
      <p className="text-xs uppercase tracking-[0.12em] text-[#9C8D90]">
        No file yet
      </p>
    );
  }
  const isPdf = path?.toLowerCase().endsWith(".pdf");
  if (isPdf) {
    return (
      <a href={src} className="text-sm text-[#CE6A73] underline" target="_blank">
        Current CV
      </a>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="mt-2 h-28 w-28 rounded-xl object-cover border border-[#F3E2E4]"
    />
  );
}

