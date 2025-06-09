"use client";

import { useEffect, useState } from "react";

type Props = {
  cursorPosition: {x: number, y: number};
};

export default function CustomCursor({ cursorPosition }: Props) {
  
  return (
    <div
      className="pointer-events-none z-[200] w-4 h-4 bg-black rounded-full"
      style={{
        position: "absolute",
        top: cursorPosition.y,
        left: cursorPosition.x,
        transform: "translate(-50%, -50%)",
        transition: "transform 0.03s linear",
      }}
    />
  );
}
