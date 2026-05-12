"use client"

import { type FC, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

interface CodeEditorProps {
  readonly value: string
  readonly onChange: (value: string) => void
  readonly placeholder?: string
  readonly readOnly?: boolean
  readonly className?: string
}

export const CodeEditor: FC<CodeEditorProps> = ({
  value,
  onChange,
  placeholder,
  readOnly = false,
  className,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const lines = value ? value.split("\n") : [""]
  const lineCount = lines.length

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  const handleScroll = useCallback(() => {
    const textarea = textareaRef.current
    const gutter = textarea?.previousElementSibling as HTMLElement | null
    if (textarea && gutter) {
      gutter.scrollTop = textarea.scrollTop
    }
  }, [])

  return (
    <div
      className={cn(
        "relative flex overflow-hidden rounded-md border bg-muted/30 font-mono text-sm",
        className
      )}
    >
      <div
        className="select-none overflow-hidden border-r bg-muted/50 px-3 py-3 text-right text-muted-foreground"
        aria-hidden="true"
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i} className="leading-6">
            {i + 1}
          </div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onScroll={handleScroll}
        placeholder={placeholder}
        readOnly={readOnly}
        spellCheck={false}
        className={cn(
          "flex-1 resize-none bg-transparent p-3 leading-6 outline-none",
          "placeholder:text-muted-foreground/50",
          readOnly && "cursor-default"
        )}
        rows={Math.max(lineCount, 10)}
      />
    </div>
  )
}
