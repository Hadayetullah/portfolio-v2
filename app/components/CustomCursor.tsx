"use client";

import { useEffect, useState } from "react";

type Props = {
  cursorPosition: {x: number, y: number};
  isULCursorVisible: boolean;
};

export default function CustomCursor({ cursorPosition, isULCursorVisible }: Props) {
  
  return (
    <div
      className={`pointer-events-none z-[200] w-4 h-4 bg-black rounded-full ${isULCursorVisible ? '' : 'hidden'}`}
      style={{
        position: "absolute",
        top: cursorPosition.y,
        left: cursorPosition.x,
        transform: "translate(-50%, -50%)", // Will be overridden
        transition: "transform 0.03s linear", // Optional: slight smoothing
      }}
    />
  );
}
