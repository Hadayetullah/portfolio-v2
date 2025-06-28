'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { ForwardedRef } from 'react'
import { motion } from "motion/react";

import { LuDownload } from "react-icons/lu";

import Social from './Social';
import Photo from './Photo';
import Stats from './Stats';

type Props = {
    isDarkMode: boolean;
    id: string;
    ref: ForwardedRef<HTMLDivElement>;
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

    <div 
        id={props.id} 
        ref={props.ref} 
        className='container h-fit lg:h-screen pt-[90px] flex flex-col items-center justify-center'
    >
        <div 
            className='w-full flex flex-col-reverse lg:flex-row items-center justify-between'
        >
            <div className='text-center lg:text-left'>
                <motion.span 
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className='text-xl'>Frontend web developer
                </motion.span>

                <motion.h2 
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className='h2 mb-6'>Hello I'm <br /><span>Hadayetullah</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className='max-w-[500px] mb-9'
                >
                    High level skills and experience in web design and development, producing quality work.
                </motion.p>

                {/* CV button and Socials */}
                <div className='flex flex-col md:flex-row items-center gap-8'>
                    <motion.a 
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        viewport={{ once: true, amount: 0.5 }}
                        href="/Hadayetullah-CV.pdf" download
                        className='px-10 py-3 flex items-center gap-2 border hover:border-secondarylight 
                        dark:hover:text-secondarydark hover:text-secondarylight dark:hover:border-secondarydark 
                        rounded-full border-gray-500 dark:text-white bg-white dark:bg-transparent 
                        uppercase text-sm font-medium duration-100' 
                    >
                        Download CV
                        {/* <Image src={assets.download_icon} alt='' className='w-4' /> */}
                        <LuDownload className='text-lg' />
                    </motion.a>

                    <div>
                        <Social 
                            containerStyles="flex gap-6" 
                            iconStyles="w-9 h-9 border border-gray-500 hover:border-secondarylight rounded-full flex justify-center 
                            items-center text-base hover:text-secondarylight duration-100 dark:hover:text-secondarydark 
                            dark:hover:border-secondarydark" 
                        />
                    </div>
                </div>
            </div>

            <div>
                <Photo />
            </div>
        </div>

        <Stats />
    </div>
    </>
  )
}

export default Header