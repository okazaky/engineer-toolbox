"use client"

import { Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ToolPageLayout } from "@/components/layout/tool-page-layout"
import { ActionToolbar } from "@/components/shared/action-toolbar"
import { ErrorDisplay } from "@/components/shared/error-display"
import { JwtInputPanel } from "@/components/jwt-decoder/jwt-input-panel"
import { JwtCardSection } from "@/components/jwt-decoder/jwt-card-section"
import { JwtExpirationBar } from "@/components/jwt-decoder/jwt-expiration-bar"
import { useJwtDecoder } from "@/hooks/use-jwt-decoder"

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function JwtDecoderPage() {
  const { input, setInput, decoded, error, expiration, handleClear } =
    useJwtDecoder()

  const actions = [
    {
      label: "Clear",
      icon: Trash2,
      onClick: handleClear,
      disabled: !input.trim(),
    },
  ] as const

  return (
    <ToolPageLayout
      title="JWT Decoder"
      description="Decode and inspect JSON Web Tokens"
    >
      <ActionToolbar actions={actions} />

      <JwtInputPanel value={input} onChange={setInput} />

      <AnimatePresence>
        {error && <ErrorDisplay message={error} />}
      </AnimatePresence>

      {decoded && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {expiration && expiration.expiresAt && (
            <motion.div variants={staggerItem}>
              <JwtExpirationBar expiration={expiration} />
            </motion.div>
          )}

          <motion.div variants={staggerItem}>
            <JwtCardSection
              title="Header"
              data={decoded.header.data}
              section="header"
              colorScheme="blue"
            />
          </motion.div>

          <motion.div variants={staggerItem}>
            <JwtCardSection
              title="Payload"
              data={decoded.payload.data}
              section="payload"
              colorScheme="purple"
            />
          </motion.div>

          <motion.div variants={staggerItem}>
            <JwtCardSection
              title="Signature"
              data={{ raw: decoded.signature.raw }}
              section="signature"
              colorScheme="orange"
            />
          </motion.div>
        </motion.div>
      )}
    </ToolPageLayout>
  )
}
