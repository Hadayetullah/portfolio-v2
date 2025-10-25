import React, { useEffect, useState } from 'react'
import CustomCursor from './CustomCursor'
import CursorNavEvent from './CursorNavEvent';

type Props = {
    isScrolled: boolean;
    activeSection: string;
}

const NavLargeDevice = ({ isScrolled, activeSection }: Props) => {
    const [hoverRect, setHoverRect] = useState<DOMRect | null>(null);
    const [cursorPosition, setCursorPosition] = useState<{x: number, y: number}>({ x: 0, y: 0 });
    const [listItemPosition, setListItemPosition] = useState<{x: number, y: number}>({ x: 0, y: 0 });
    const [ulCursorVisibility, setULCursorVisibility] = useState<boolean>(false);
    const [hoverDirection, setHoverDirection] = useState<null | string>(null);

    const getEntryDirection = (e: React.MouseEvent, rect: DOMRect) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const w = rect.width;
        const h = rect.height;
        const xRatio = x / w;
        const yRatio = y / h;

        const fromLeft = xRatio < 0.25;
        const fromRight = xRatio > 0.75;
        const fromTop = yRatio < 0.25;
        const fromBottom = yRatio > 0.75;

        if (fromTop) return "top bottom";
        if (fromBottom) return "bottom";
        if (fromLeft) return "left";
        if (fromRight) return "right";

        return "center";
    };

    const getCenterPosition = (rect: DOMRect) => {
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        };
    };


    const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setHoverRect(rect);

        const direction = getEntryDirection(e, rect);
        setHoverDirection(direction);
        // console.log("Direction : ", direction)
    };

    const handleMouseLeave = () => {
        setHoverRect(null);
        setHoverDirection(null);
    };

    const handleULCursorVisibility = (e: boolean) => {
        setULCursorVisibility(e);
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLUListElement>) => {
        if (!hoverRect) {
            const rect = e.currentTarget.getBoundingClientRect();
            setCursorPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            });
        }
    };

    useEffect(() => {
        if (hoverRect) {
            const ulRect = document.querySelector('ul')?.getBoundingClientRect();
            if (ulRect) {
                const center = getCenterPosition(hoverRect);
                setCursorPosition({
                    x: center.x - ulRect.left,
                    y: center.y - ulRect.top,
                });
            }
        }
    }, [hoverRect]);

  return (
    <div>
        {/* <CursorNavEvent hoveredElementRect={hoverRect} hoverDirection={hoverDirection} /> */}
        <ul 
            onMouseMove={handleMouseMove}
            onMouseEnter={() => handleULCursorVisibility(true)}
            onMouseLeave={() => handleULCursorVisibility(false)}
            className={`hidden relative md:flex items-center gap-2 lg:gap-4 rounded-full px-4 lg:px-8 xl:px-12 py-3 
                ${isScrolled ? '' : 'bg-[#ffffff50] shadow-sm dark:border dark:border-white/50 dark:bg-transparent'}`}
        >
            <CustomCursor cursorPosition={cursorPosition} isULCursorVisible={ulCursorVisibility} hoveredElementRect={hoverRect} />
            <li 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`${activeSection === "home" ? "bg-secondarylight text-white dark:bg-transparent dark:border-[0.5px] dark:border-secondarydark dark:text-secondarydark italic font-medium" : ""} rounded-[8px]`}
            >
                <a className='font-ovo cursor-pointer px-4 py-1' href="#home">Home</a>
            </li>
            <li 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`${activeSection === "services" ? "bg-secondarylight text-white dark:bg-transparent dark:border-[0.5px] dark:border-secondarydark dark:text-secondarydark italic font-medium" : ""} rounded-[8px]`}
            >
                <a className='font-ovo cursor-pointer px-4 py-1' href="#services">Services</a>
            </li>
            <li 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`${activeSection === "resume" ? "bg-secondarylight text-white dark:bg-transparent dark:border-[0.5px] dark:border-secondarydark dark:text-secondarydark italic font-medium" : ""} rounded-[8px]`}
            >
                <a className='font-ovo cursor-pointer px-4 py-1' href="#resume">Resume</a>
            </li>
            {/* Temporary comment */}
            <li 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`${activeSection === "work" ? "bg-secondarylight text-white dark:bg-transparent dark:border-[0.5px] dark:border-secondarydark dark:text-secondarydark italic font-medium" : ""} rounded-[8px]`}
            >
                <a className='font-ovo cursor-pointer px-4 py-1' href="#work">My Work</a>
            </li>
            <li 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`${activeSection === "contact" ? "bg-secondarylight text-white dark:bg-transparent dark:border-[0.5px] dark:border-secondarydark dark:text-secondarydark italic font-medium" : ""} rounded-[8px]`}
            >
                <a className='font-ovo cursor-pointer px-4 py-1' href="#contact">Contact me</a>
            </li>
        </ul>
    </div>
  )
}

export default NavLargeDevice