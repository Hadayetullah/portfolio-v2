'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

import {assets} from '@/assets/assets'
import CursorNavEvent from './CursorNavEvent';
import CustomCursor from './CustomCursor';
import NavLargeDevice from './NavLargeDevice';

interface NavbarProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
    activeSection: string;
}

const Navbar = ({isDarkMode, setIsDarkMode, activeSection}: NavbarProps) => {
    const sideMenuRef = useRef<HTMLUListElement>(null);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [urlPath, setUrlPath] =  useState<string>("home");

    const handleUrlPath = (e:any) => {
        setUrlPath(e)
        // console.log("Pathname : ", e)
    }

    const openMenu = () => {
        if (sideMenuRef.current) {
            sideMenuRef.current.style.transform = 'translateX(-16rem)';
        }
    }

    const closeMenu = () => {
        if (sideMenuRef.current) {
            sideMenuRef.current.style.transform = 'translateX(0)';
        }
    }

    useEffect(() => {
        if (!isDarkMode) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50 && !isScrolled) {
                    setIsScrolled(true);
                } else if (window.scrollY <= 50 && isScrolled) {
                    setIsScrolled(false);
                }

                // console.log(window.location.assign("/#home"))
            });
        }
    })

    // useEffect(() => {
    //     console.log(window.location.hash)
    // }, [])

    // useEffect(() => {
    //     const move = (e: MouseEvent) => {
    //     setCursorPosition({ x: e.clientX, y: e.clientY });
    //     };
    //     window.addEventListener("mousemove", move);
    //     return () => window.removeEventListener("mousemove", move);
    // }, []);

  return (
    <>
        <div className='fixed top-0 right-0 -z-10 w-11/12 translate-y-[-80%] dark:hidden'>
            <Image src={assets.header_bg_color} alt='' className='w-full'/>
        </div>
        
        <nav 
            className={`fixed top-0 left-0 right-0 w-full px-5 lg:px-8 xl:px-[8%] flex items-center justify-between py-4 z-50 
                dark:bg-darktheme dark:shadow-white/20 ${isScrolled ? 'bg-[#ffffff50] shadow-sm backdrop-blur-lg' : ''}`}
        >
            <a href="#home" className='cursor-pointer mr-14 text-[28px] font-outfit '>
                Hadayetullah
            </a>

            {/* <a href="">
                <Image src={assets.logo} alt='' className='w-28 cursor-pointer mr-14'  />
            </a> */}

            <NavLargeDevice isScrolled={isScrolled} handleUrlPath={handleUrlPath} activeSection={activeSection} />

            <div className='flex items-center gap-4'>
                <button 
                    onClick={()=> setIsDarkMode(!isDarkMode)} 
                    className='cursor-pointer'
                >
                    <Image src={isDarkMode ? assets.sun_icon : assets.moon_icon} alt='' className='w-6' />
                </button>

                <a 
                    href="#contact" 
                    className='hidden md:flex items-center gap-3 px-10 border border-gray-500 rounded-full 
                    py-2.5 ml-4 font-ovo dark:border-white/50'
                >
                    Contact 
                    <Image src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon} alt='' className='w-3' />
                </a>

                <button onClick={openMenu} className='block md:hidden ml-3 cursor-pointer'>
                    <Image src={isDarkMode ? assets.menu_white : assets.menu_black} alt='' className='w-6' />
                </button>
            </div>

            {/* -------------- Mobile Menu --------------- */}
            <ul 
                ref={sideMenuRef} 
                className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 
                h-screen bg-rose-50 transition duration-500 dark:bg-darkhover dark:text-white'
            >
                <button className='absolute right-6 top-6' onClick={closeMenu}>
                    <Image src={isDarkMode ? assets.close_white : assets.close_black} alt='' className='w-5 cursor-pointer' />
                </button>

                <li><a onClick={closeMenu} className='font-ovo' href="#home">Home</a></li>
                <li><a onClick={closeMenu} className='font-ovo' href="#about">About me</a></li>
                <li><a onClick={closeMenu} className='font-ovo' href="#services">Services</a></li>
                <li><a onClick={closeMenu} className='font-ovo' href="#work">My Work</a></li>
                <li><a onClick={closeMenu} className='font-ovo' href="#contact">Contact me</a></li>
            </ul>

        </nav>
    </>
  )
}

export default Navbar