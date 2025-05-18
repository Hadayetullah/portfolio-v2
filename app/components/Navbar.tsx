'use client'

import Image from 'next/image'
import React from 'react'

import {assets} from '@/assets/assets'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <>
    <nav className='w-full fixed px-5 lg:px-8 xl:px-[8%] flex items-center justify-between py-4 Z-50 '>
        <a href="#home" className='cursor-pointer mr-14 text-[28px] '>
            Hadayetullah
        </a>

        {/* <a href="">
            <Image src={assets.logo} alt='' className='w-28 cursor-pointer mr-14'  />
        </a> */}

        <ul className='hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 '>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About me</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#work">My Work</a></li>
            <li><a href="#contact">Contact me</a></li>
        </ul>

        <div>
            <a href="#contact" className='hidden md:flex items-center gap-3 px-10 border border-gray-500 rounded-full py-2.5 ml-4 ' >Contact <Image src={assets.arrow_icon} alt='' className='w-3' /></a>
        </div>
    </nav>
    </>
  )
}

export default Navbar