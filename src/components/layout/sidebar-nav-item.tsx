"use client"

import { type FC } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { type NavItem } from "@/types/common.types"
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface SidebarNavItemProps {
  readonly item: NavItem
}

export const SidebarNavItem: FC<SidebarNavItemProps> = ({ item }) => {
  const pathname = usePathname()
  const isActive = pathname === item.href

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
        <Link href={item.href} className="relative">
          {isActive && (
            <motion.div
              layoutId="sidebar-active-indicator"
              className="absolute inset-0 rounded-md bg-sidebar-accent"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <item.icon className="relative z-10" />
          <span className="relative z-10">{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
