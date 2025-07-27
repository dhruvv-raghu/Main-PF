"use client"

import React from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="bg-yellow-300 font-main">
        {children}
      </div>
    </div>
  )
}