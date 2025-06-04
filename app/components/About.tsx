'use client'

import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from 'motion/react'

type Props = {
    isDarkMode: boolean;
}

const About = (props: Props) => {
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        id="about" 
        className='w-full px-[12%] py-10 scroll-mt-20'
    >
        <motion.h4 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='text-center mb-2 text-lg font-ovo'
        >
            Introduction
        </motion.h4>

        <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='text-5xl text-center font-ovo'
        >
            About me
        </motion.h2>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'
        >
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className='w-64 sm:w-80 rounded-3xl max-w-none'
            >
                <Image src={assets.user_image} alt='user' className='w-full rounded-3xl bg-[#E4E0DC] ' />
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className='flex-1'
            >
                <p className='mb-10 max-w-2xl font-ovo text-justify'>
                    I am a frontend web developer with 1 year of professional experience and over 7 years 
                    of self-directed learning. I specialize in building responsive, user-friendly web 
                    applications with a strong focus on modern technologies and best practices. I am 
                    passionate about crafting clean, intuitive interfaces and continuously improving my 
                    skills to deliver high-quality user experiences.
                </p>

                <motion.ul 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'
                >
                    {
                        infoList.map(({icon, iconDark, title, description}, index) => (
                            <motion.li 
                                whileHover={{ scale: 1.05}}
                                key={index} 
                                className='border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer 
                                hover:bg-lighthover hover:-translate-y-1 duration-500 
                                hover:shadow-shadowblack dark:border-white dark:hover:shadow-white dark:hover:bg-darkhover/50'
                            >
                                <Image src={props.isDarkMode ? iconDark : icon} alt='' className='w-7 mt-3' />
                                <h3 className='my-4 font-semibold text-gray-400 dark:text-white'>{title}</h3>
                                <p className='text-gray-600 text-sm dark:text-white/80'>{description}</p>
                            </motion.li>
                        ))
                    }
                </motion.ul>

                <motion.h4 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    className='my-6 font-ovo text-gray-700 dark:text-white/80'
                >
                    Tools I use
                </motion.h4>

                <motion.ul 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    className='flex items-center gap-3 sm:gap-5'
                >
                    {
                        toolsData.map((tool, index) => (
                            <motion.li 
                                whileHover={{ scale: 1.1 }}
                                key={index}
                                className='w-12 sm:w-14 flex items-center justify-center aspect-square border border-gray-400 rounded-xl cursor-pointer hover:-translate-y-1 duration-500'
                            >
                                <Image src={tool} alt='Tool' className='w-5 sm:w-7' />
                            </motion.li>
                        ))
                    }
                </motion.ul>
            </motion.div>
        </motion.div>
    </motion.div>
  )
}

export default About