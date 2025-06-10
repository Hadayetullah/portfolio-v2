import React, { useEffect, useState } from 'react';

type Props = {
  cursorPosition: { x: number; y: number };
  isULCursorVisible: boolean;
  hoveredElementRect?: DOMRect | null;
};

const CustomCursor = ({ cursorPosition, isULCursorVisible, hoveredElementRect }: Props) => {
  const [style, setStyle] = useState<React.CSSProperties>({
    position: 'absolute',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease',
    zIndex: 100,
  });

  useEffect(() => {
    let newWidth = 16;
    let newHeight = 16;
    let borderRadius = '50%';
    let backgroundColor = 'rgba(0,0,0,0.8)';

    if (hoveredElementRect) {
      newWidth = hoveredElementRect.width;
      newHeight = hoveredElementRect.height;
      borderRadius = '8px';
      backgroundColor = 'rgba(0,0,0,0.2)';
    }

    setStyle((prev) => ({
      ...prev,
      left: cursorPosition.x,
      top: cursorPosition.y,
      width: newWidth,
      height: newHeight,
      borderRadius,
      backgroundColor,
    }));
  }, [cursorPosition, hoveredElementRect]);

  if (!isULCursorVisible) return null;

  return <div style={style} />;
};

export default CustomCursor;
