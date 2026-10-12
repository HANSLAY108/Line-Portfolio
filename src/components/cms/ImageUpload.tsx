"use client";

import { useEffect, useRef, useState } from "react";
import { publicMediaUrl } from "@/lib/media";

type ImageUploadProps = {
  name: string;
  label: string;
  currentPath?: string | null;
  helperText?: string;
  aspectRatio?: "square" | "video" | "portrait" | "auto";
  removeFieldName?: string;
  accept?: string;
};

export default function ImageUpload({
  name,
  label,
  currentPath,
  helperText,
  aspectRatio = "auto",
  removeFieldName,
  accept = "image/png,image/jpeg,image/webp,image/avif,image/gif",
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(() =>
    publicMediaUrl(currentPath),
  );
  const [isRemoved, setIsRemoved] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Sync if currentPath changes from props
  useEffect(() => {
    if (!selectedFile && !isRemoved) {
      setPreviewUrl(publicMediaUrl(currentPath));
    }
  }, [currentPath, selectedFile, isRemoved]);

  // Clean up object URLs on unmount
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
    if (files && files[0] && files[0].type.startsWith("image/")) {
      handleFileChange(files[0]);
      if (fileInputRef.current) {
        // Create DataTransfer to assign to input
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

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square max-w-[280px]"
      : aspectRatio === "portrait"
        ? "aspect-[4/5] max-w-[280px]"
        : aspectRatio === "video"
          ? "aspect-[16/10] max-w-[420px]"
          : "max-h-[300px] w-auto";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-light">
          {label}
        </label>
        {isRemoved && (
          <span className="text-xs font-medium text-amber-600">
            Image marked for removal
          </span>
        )}
        {selectedFile && (
          <span className="text-xs font-medium text-emerald-600">
            New image selected ({Math.round(selectedFile.size / 1024)} KB)
          </span>
        )}
      </div>

      {helperText && <p className="text-xs text-muted">{helperText}</p>}

      {/* Hidden inputs */}
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

      {/* Preview and Controls */}
      {previewUrl && !isRemoved ? (
        <div className="animate-fade-in relative group overflow-hidden rounded-2xl border border-border bg-[#f8f9fa] p-3 transition-all hover:border-foreground/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div
              className={`relative overflow-hidden rounded-xl border border-border/80 bg-neutral-100 ${aspectClass}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt={label}
                className="h-full w-full object-cover"
              />
              {selectedFile && (
                <div className="absolute top-2 left-2 rounded-full bg-emerald-600/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
                  Unsaved
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2.5">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {selectedFile ? selectedFile.name : (currentPath?.split("/").pop() ?? "Current image")}
                </p>
                <p className="text-xs text-muted">
                  {selectedFile
                    ? `Ready to upload (${Math.round(selectedFile.size / 1024)} KB)`
                    : "Currently stored in Supabase media bucket"}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-lg border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm transition hover:bg-neutral-50 hover:border-foreground/20"
                >
                  Change Image
                </button>

                <button
                  type="button"
                  onClick={handleRemove}
                  className="rounded-lg border border-red-200 bg-red-50/50 px-3.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100/60"
                >
                  Remove
                </button>

                {!selectedFile && previewUrl && (
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent-text hover:underline px-2 py-1"
                  >
                    View Original
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`animate-fade-in cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
            isDragging
              ? "border-accent bg-accent-soft/40"
              : "border-border hover:border-accent hover:bg-accent-soft/20 bg-white"
          }`}
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-text">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          <p className="mt-3 text-sm font-medium text-foreground">
            Drop your image here, or{" "}
            <span className="text-accent-text underline">browse files</span>
          </p>
          <p className="mt-1 text-xs text-muted">
            Supports PNG, JPG, WebP, AVIF up to 10MB
          </p>

          {isRemoved && currentPath && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleUndo();
              }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text hover:underline"
            >
              Undo removal
            </button>
          )}
        </div>
      )}
    </div>
  );
}
