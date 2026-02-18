"use client";

import { glassCard, glassCardHover } from "../../styles/theme";
import { useState } from "react";

export default function Card({ children, className = "", hover = true, style: customStyle = {} }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-500 ${className}`}
      style={{
        ...(hovered && hover ? glassCardHover : glassCard),
        ...customStyle,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}
