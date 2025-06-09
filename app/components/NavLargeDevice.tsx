import React, { useState } from 'react'
import CustomCursor from './CustomCursor'
import CursorNavEvent from './CursorNavEvent';

type Props = {
    isScrolled: boolean;
}

const NavLargeDevice = ({isScrolled}: Props) => {
        const [hoverRect, setHoverRect] = useState<DOMRect | null>(null);
    const [cursorPosition, setCursorPosition] = useState<{x: number, y: number}>({ x: 0, y: 0 });

    // console.log("first")


        const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setHoverRect(rect);
        };
    
        const handleMouseLeave = () => {
            setHoverRect(null);
        };
    
        const handleMouseMove = (e: React.MouseEvent<HTMLUListElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            console.log("ClientX : ",e.clientX)
            console.log("Rect left : ",rect.left)
            setCursorPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

  return (
    <div>
        <CursorNavEvent hoveredElementRect={hoverRect} />
        <ul 
            onMouseMove={handleMouseMove}
            className={`hidden cursor-none relative md:flex items-center gap-2 lg:gap-4 rounded-full px-12 py-3 
                ${isScrolled ? '' : 'bg-[#ffffff50] shadow-sm dark:border dark:border-white/50 dark:bg-transparent'}`}
        >
            <CustomCursor cursorPosition={cursorPosition} />
            <li 
                className='cursor-none px-4 py-1'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <a className='font-ovo cursor-none' href="#home">Home</a>
            </li>
            <li 
                className='cursor-none px-4 py-1'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <a className='font-ovo cursor-none' href="#about">About me</a>
            </li>
            <li 
                className='cursor-none px-4 py-1'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <a className='font-ovo cursor-none' href="#services">Services</a>
            </li>
            <li 
                className='cursor-none px-4 py-1'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <a className='font-ovo cursor-none' href="#work">My Work</a>
            </li>
            <li 
                className='cursor-none px-4 py-1'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <a className='font-ovo cursor-none' href="#contact">Contact me</a>
            </li>
        </ul>
    </div>
  )
}

export default NavLargeDevice