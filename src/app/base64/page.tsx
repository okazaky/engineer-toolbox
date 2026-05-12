"use client"

import { Trash2 } from "lucide-react"
import { ToolPageLayout } from "@/components/layout/tool-page-layout"
import { ActionToolbar } from "@/components/shared/action-toolbar"
import { Base64InputPanel } from "@/components/base64/base64-input-panel"
import { Base64OutputPanel } from "@/components/base64/base64-output-panel"
import { Base64DirectionToggle } from "@/components/base64/base64-direction-toggle"
import { useBase64 } from "@/hooks/use-base64"

export default function Base64Page() {
  const {
    state,
    setInput,
    toggleDirection,
    handleClear,
    isAutoDetected,
  } = useBase64()

  const actions = [
    {
      label: "Clear",
      icon: Trash2,
      onClick: handleClear,
      disabled: !state.input.trim(),
    },
  ] as const

  return (
    <ToolPageLayout
      title="Base64 Encoder / Decoder"
      description="Encode text to Base64 or decode Base64 strings with auto-detection"
    >
      <div className="flex flex-wrap items-center gap-4">
        <Base64DirectionToggle
          direction={state.direction}
          onToggle={toggleDirection}
          isAutoDetected={isAutoDetected}
        />
        <ActionToolbar actions={actions} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Base64InputPanel
          value={state.input}
          onChange={setInput}
          direction={state.direction}
        />
        <Base64OutputPanel
          value={state.output}
          error={state.error}
          direction={state.direction}
        />
      </div>
    </ToolPageLayout>
  )
}
