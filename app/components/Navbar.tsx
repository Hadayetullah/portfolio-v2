'use client'

import Image from 'next/image'
import React, { useRef } from 'react'

import {assets} from '@/assets/assets'

type Props = {}

const Navbar = (props: Props) => {
    const sideMenuRef = useRef<HTMLUListElement>(null)

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

  return (
    <>
    <div className='fixed top-0 right-0 -z-10 w-11/12 translate-y-[-80%] '>
        <Image src={assets.header_bg_color} alt='' className='w-full'/>
    </div>
    <nav className='w-full fixed px-5 lg:px-8 xl:px-[8%] flex items-center justify-between py-4 z-50 '>
        <a href="#home" className='cursor-pointer mr-14 text-[28px] font-outfit '>
            Hadayetullah
        </a>

        {/* <a href="">
            <Image src={assets.logo} alt='' className='w-28 cursor-pointer mr-14'  />
        </a> */}

        <ul className='hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white shadow-sm '>
            <li><a className='font-ovo' href="#home">Home</a></li>
            <li><a className='font-ovo' href="#about">About me</a></li>
            <li><a className='font-ovo' href="#services">Services</a></li>
            <li><a className='font-ovo' href="#work">My Work</a></li>
            <li><a className='font-ovo' href="#contact">Contact me</a></li>
        </ul>

        <div className='flex items-center gap-4'>
            <button>
                <Image src={assets.moon_icon} alt='' className='w-6' />
            </button>

            <a href="#contact" className='hidden md:flex items-center gap-3 px-10 border border-gray-500 rounded-full py-2.5 ml-4 font-ovo ' >Contact <Image src={assets.arrow_icon} alt='' className='w-3' /></a>

            <button onClick={openMenu} className='block md:hidden ml-3 cursor-pointer'>
                <Image src={assets.menu_black} alt='' className='w-6' />
            </button>
        </div>

        {/* -------------- Mobile Menu --------------- */}
        <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 
        h-screen bg-rose-50 transition duration-500 '>
            <button className='absolute right-6 top-6' onClick={closeMenu}>
                <Image src={assets.close_black} alt='' className='w-5 cursor-pointer' />
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