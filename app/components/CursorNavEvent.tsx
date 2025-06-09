import React from 'react'

type Props = {
  hoveredElementRect: DOMRect | null;
};

const CursorNavEvent = ({ hoveredElementRect }: Props) => {
  return (
    <div>
        {hoveredElementRect && (
        <div
        style={{
            top: hoveredElementRect.top + window.scrollY,
            left: hoveredElementRect.left + window.scrollX,
            width: hoveredElementRect.width,
            height: hoveredElementRect.height,
            borderRadius: '8px',
            zIndex: 50,
          }}
          className={`fixed pointer-events-none cursor-none border border-red-900 transition-all duration-300 ease-in-out`}
        />
      )}
    </div>
  )
}

export default CursorNavEvent