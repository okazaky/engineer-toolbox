"use client"

import { Sparkles, Minimize2, Trash2 } from "lucide-react"
import { ToolPageLayout } from "@/components/layout/tool-page-layout"
import { ActionToolbar } from "@/components/shared/action-toolbar"
import { JsonInputPanel } from "@/components/json-formatter/json-input-panel"
import { JsonOutputPanel } from "@/components/json-formatter/json-output-panel"
import { JsonDiffView } from "@/components/json-formatter/json-diff-view"
import { JsonFormatControls } from "@/components/json-formatter/json-format-controls"
import { useJsonFormatter } from "@/hooks/use-json-formatter"

export default function JsonFormatterPage() {
  const {
    state,
    setInput,
    setIndent,
    handleFormat,
    handleMinify,
    handleClear,
  } = useJsonFormatter()

  const actions = [
    {
      label: "Format",
      icon: Sparkles,
      onClick: handleFormat,
      disabled: !state.input.trim() || !state.validation.valid,
    },
    {
      label: "Minify",
      icon: Minimize2,
      onClick: handleMinify,
      disabled: !state.input.trim() || !state.validation.valid,
    },
    {
      label: "Clear",
      icon: Trash2,
      onClick: handleClear,
      disabled: !state.input.trim(),
    },
  ] as const

  return (
    <ToolPageLayout
      title="JSON Formatter"
      description="Beautify, minify, and validate your JSON data"
    >
      <div className="flex flex-wrap items-center gap-4">
        <ActionToolbar actions={actions} />
        <JsonFormatControls indent={state.indent} onIndentChange={setIndent} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <JsonInputPanel
          value={state.input}
          onChange={setInput}
          validation={state.validation}
        />
        <JsonOutputPanel value={state.output} />
      </div>

      {state.input && state.output && (
        <JsonDiffView original={state.input} formatted={state.output} />
      )}
    </ToolPageLayout>
  )
}
