import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface InlineEditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  type?: "text" | "textarea";
  placeholder?: string;
  className?: string;
  displayClassName?: string;
  as?: keyof JSX.IntrinsicElements;
  rows?: number;
}

export function InlineEditableField({
  value,
  onChange,
  isEditing,
  type = "text",
  placeholder = "Введите текст...",
  className,
  displayClassName,
  as: Component = "span",
  rows = 3,
}: InlineEditableFieldProps) {
  if (!isEditing) {
    return <Component className={displayClassName}>{value || placeholder}</Component>;
  }

  if (type === "textarea") {
    return (
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn("w-full min-h-[80px] resize-none", className)}
        rows={rows}
      />
    );
  }

  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn("w-full", className)}
    />
  );
}
