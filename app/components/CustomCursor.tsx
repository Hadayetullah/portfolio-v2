import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type Props = {
  cursorPosition: { x: number; y: number };
  isULCursorVisible: boolean;
  hoveredElementRect?: DOMRect | null;
};

const CustomCursor = ({ cursorPosition, isULCursorVisible, hoveredElementRect }: Props) => {
  const cursorX = useMotionValue(cursorPosition.x);
  const cursorY = useMotionValue(cursorPosition.y);

  const springX = useSpring(cursorX, { stiffness: 120, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 20 });

  const defaultSize = 16;
  const hoveredWidth = hoveredElementRect?.width ?? defaultSize;
  const hoveredHeight = hoveredElementRect?.height ?? defaultSize;
  const width = hoveredElementRect ? hoveredWidth : defaultSize;
  const height = hoveredElementRect ? hoveredHeight : defaultSize;
  const borderRadius = '8px';
  const backgroundColor = hoveredElementRect ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.8)';

  // Update motion values on cursorPosition change
  React.useEffect(() => {
    cursorX.set(cursorPosition.x);
    cursorY.set(cursorPosition.y);
  }, [cursorPosition.x, cursorPosition.y, cursorX, cursorY]);

  if (!isULCursorVisible) return null;

  return (
    <motion.div
      style={{
        position: 'absolute',
        width,
        height,
        borderRadius,
        backgroundColor,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 100,
        left: springX,
        top: springY,
        transition: 'width 0.1s ease, height 0.1s ease, background-color 0.1s ease',
      }}
    />
  );
};

export default CustomCursor;
