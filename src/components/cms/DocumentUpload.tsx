"use client";

import { useEffect, useRef, useState } from "react";
import { publicMediaUrl } from "@/lib/media";

type DocumentUploadProps = {
  name: string;
  label: string;
  currentPath?: string | null;
  helperText?: string;
  removeFieldName?: string;
  accept?: string;
};

export default function DocumentUpload({
  name,
  label,
  currentPath,
  helperText,
  removeFieldName,
  accept = "application/pdf,.pdf",
}: DocumentUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(() =>
    publicMediaUrl(currentPath),
  );
  const [isRemoved, setIsRemoved] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!selectedFile && !isRemoved) {
      setPreviewUrl(publicMediaUrl(currentPath));
    }
  }, [currentPath, selectedFile, isRemoved]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleFileChange(file: File | null) {
    if (!file) return;
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
    setIsRemoved(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileChange(files[0]);
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(files[0]);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }

  function handleRemove() {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsRemoved(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleUndo() {
    setIsRemoved(false);
    setSelectedFile(null);
    setPreviewUrl(publicMediaUrl(currentPath));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const hasCurrentOrNew = (previewUrl || selectedFile) && !isRemoved;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-light">
          {label}
        </label>
        {isRemoved && (
          <span className="text-xs font-medium text-amber-600">
            File marked for removal
          </span>
        )}
        {selectedFile && (
          <span className="text-xs font-medium text-emerald-600">
            New file selected ({Math.round(selectedFile.size / 1024)} KB)
          </span>
        )}
      </div>

      {helperText && <p className="text-xs text-muted">{helperText}</p>}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          handleFileChange(file);
        }}
      />
      {isRemoved && removeFieldName && (
        <input type="hidden" name={removeFieldName} value="true" />
      )}

      {/* Uploaded state */}
      {hasCurrentOrNew ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border bg-[#f8f9fa] p-4 transition-all hover:border-foreground/20">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedFile ? selectedFile.name : (currentPath?.split("/").pop() ?? "CV / Resume.pdf")}
              </p>
              <p className="text-xs text-muted">
                {selectedFile
                  ? `Ready to upload (${Math.round(selectedFile.size / 1024)} KB)`
                  : "Currently live and linked on the public Projects page"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm transition hover:bg-neutral-50 hover:border-foreground/20"
            >
              Replace PDF
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="rounded-lg border border-red-200 bg-red-50/50 px-3.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100/60"
            >
              Remove
            </button>
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-accent-text hover:underline shadow-sm"
              >
                View PDF
              </a>
            )}
          </div>
        </div>
      ) : isRemoved ? (
        <div className="flex items-center justify-between rounded-2xl border border-dashed border-amber-300 bg-amber-50/50 p-4">
          <p className="text-xs text-amber-800">
            CV will be cleared on save.
          </p>
          <button
            type="button"
            onClick={handleUndo}
            className="text-xs font-medium text-accent-text hover:underline"
          >
            Undo removal
          </button>
        </div>
      ) : (
        /* Empty / Dropzone state */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
            isDragging
              ? "border-accent bg-accent-soft/30"
              : "border-border bg-neutral-50/50 hover:border-foreground/30 hover:bg-neutral-50"
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-muted shadow-sm ring-1 ring-border">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="mt-3 text-xs font-medium text-foreground">
            Drop CV / resume PDF here, or <span className="text-accent-text underline">browse</span>
          </p>
          <p className="mt-1 text-[11px] text-muted">Supports PDF up to 20MB</p>
        </div>
      )}
    </div>
  );
}
