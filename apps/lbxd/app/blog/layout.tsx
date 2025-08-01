"use client"

import type React from "react"

// The main BlogLayout component
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div>
        {children}
      </div>
    </div>
  )
}