'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react";

type Props = {
    isDarkMode: boolean;
}

const Header = (props: Props) => {
  return (
    <>
    {/* <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 '>
        <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className='w-35 h-35 bg-[#E4E0DC] rounded-full overflow-hidden flex items-start justify-center'
        >
            <Image src={assets.profile_img} alt='' className='w-32 ' />
        </motion.div>

        <motion.h3 
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='flex items-end gap-2 text-xl md:text-2xl mb-3 font-ovo'
        >
            Hi! I'm Hadayetullah 
            <Image src={assets.hand_icon} alt='' className='w-6' />
        </motion.h3>

        <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className='text-3xl sm:text-3xl lg:text-[66px] font-ovo'
        >
            Frontend web developer
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className='font-ovo mx-auto max-w-2xl'
        >
            High level skills and experience in web design and development, producing quality work.
        </motion.p>

        <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
            <motion.a 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                href="#contact"
                className='px-10 py-3 flex items-center gap-2 border border-white rounded-full 
                bg-black text-white dark:bg-transparent group' 
            >
                Contact me
                <Image src={assets.right_arrow_white} alt='' className='w-4 duration-300 group-hover:translate-x-[2px]' />
            </motion.a>

            <motion.a 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }} 
                href="/Hadayetullah-CV.pdf" download
                className='px-10 py-3 flex items-center gap-2 border rounded-full border-gray-500 
                dark:text-black bg-white' 
            >
                My resume
                <Image src={assets.download_icon} alt='' className='w-4' />
            </motion.a>
        </div>
    </div> */}
    <div className='w-full h-screen px-[12%] pt-[90px] md:pt-8 flex flex-col md:flex-row items-center justify-between'>
        <div className='text-center xl:text-left'>
            <span className='text-xl'>Software developer</span>
            <h1 className='text-3xl sm:text-5xl lg:text-[66px]'>Hello I'm <br /><span>Hadayetullah</span></h1>
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className='max-w-[500px] mb-9 text-white/80 '
            >
                High level skills and experience in web design and development, producing quality work.
            </motion.p>
        </div>

        <div>Photo</div>
    </div>
    </>
  )
}

export default Header