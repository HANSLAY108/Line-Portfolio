import { publicMediaUrl } from "@/lib/media";

export function PageTitle({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-text">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-1 font-serif text-3xl font-medium">{title}</h1>
      </div>
      {action}
    </div>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
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
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  textarea?: boolean;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="field" htmlFor={name}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          required={required}
          defaultValue={defaultValue ?? ""}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue ?? ""}
        />
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
    <label className="inline-flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 accent-[#d69e9e]"
      />
      {label}
    </label>
  );
}

export function SaveButton({ label = "Save" }: { label?: string }) {
  return (
    <button
      type="submit"
      className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
    >
      {label}
    </button>
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
      <p className="text-xs uppercase tracking-[0.12em] text-muted-light">
        No file yet
      </p>
    );
  }
  const isPdf = path?.toLowerCase().endsWith(".pdf");
  if (isPdf) {
    return (
      <a href={src} className="text-sm text-accent-text underline" target="_blank">
        Current CV
      </a>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="mt-2 h-28 w-28 rounded-xl object-cover" />
  );
}
