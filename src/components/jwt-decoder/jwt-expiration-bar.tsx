"use client"

import { type FC } from "react"
import { motion } from "framer-motion"
import { type ExpirationInfo } from "@/types/jwt-decoder.types"
import { cn } from "@/lib/utils"

interface JwtExpirationBarProps {
  readonly expiration: ExpirationInfo
}

export const JwtExpirationBar: FC<JwtExpirationBarProps> = ({
  expiration,
}) => {
  const getColor = () => {
    if (expiration.isExpired) return "bg-red-500"
    if (expiration.percentage > 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Token Lifetime</span>
        <span
          className={cn(
            "font-medium",
            expiration.isExpired && "text-red-500",
            !expiration.isExpired &&
              expiration.percentage > 75 &&
              "text-yellow-500",
            !expiration.isExpired &&
              expiration.percentage <= 75 &&
              "text-green-500"
          )}
        >
          {expiration.timeRemaining}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          className={cn("h-full rounded-full", getColor())}
          initial={{ width: 0 }}
          animate={{ width: `${expiration.percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        {expiration.issuedAt && (
          <span>Issued: {expiration.issuedAt.toLocaleString()}</span>
        )}
        {expiration.expiresAt && (
          <span>Expires: {expiration.expiresAt.toLocaleString()}</span>
        )}
      </div>
    </div>
  )
}
