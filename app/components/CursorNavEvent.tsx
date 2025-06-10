import React, { useEffect, useState } from 'react'

type Props = {
  hoveredElementRect: DOMRect | null;
  hoverDirection: string | null;
};

const CursorNavEvent = ({ hoveredElementRect, hoverDirection }: Props) => {
  const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0 });

  useEffect(() => {
    if (hoveredElementRect) {
      setStyle({
            top: hoveredElementRect.top,
            left: hoveredElementRect.left,
            width: hoveredElementRect.width,
            height: hoveredElementRect.height,
            borderRadius: '8px',
            zIndex: 50,
            opacity: 1,
      });
    } else {
      setStyle((prev) => ({
        ...prev,
        opacity: 0,
      }));
    }
  }, [hoveredElementRect]);

  return (
    <div>
        {hoveredElementRect && (
        <div
          className={`fixed pointer-events-none cursor-none border-[0.5px] border-gray-700 bg-black/20 transition-[width] duration-3000 ease-in-out`}
          style={style}
        />
      )}
    </div>
  )
}

export default CursorNavEvent