import React from 'react'

type Props = {
  hoveredElementRect: DOMRect | null;
};

const CursorNavEvent = ({ hoveredElementRect }: Props) => {
    // console.log(hoveredElementRect)
  return (
    <div>
        {hoveredElementRect && (
        <div
          className="fixed pointer-events-none cursor-none border border-red-900 transition-all duration-300 ease-in-out"
          style={{
            top: hoveredElementRect.top + window.scrollY,
            left: hoveredElementRect.left + window.scrollX,
            width: hoveredElementRect.width,
            height: hoveredElementRect.height,
            borderRadius: '8px',
            zIndex: 50,
          }}
        />
      )}
    </div>
  )
}

export default CursorNavEvent