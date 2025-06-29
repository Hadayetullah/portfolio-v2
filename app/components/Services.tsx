'use client'

import React, { ForwardedRef } from 'react'
// import { backendSvgIcon, frontendSvgIcon } from '../../assets/svgIcons';
import { assets, serviceData } from '@/assets/assets';
import Image from 'next/image';
import { motion } from 'motion/react'

type Props = {
    isDarkMode: boolean;
    id: string;
    ref: ForwardedRef<HTMLDivElement>;
}

const Services = (props: Props) => {

    // const serviceData = [
    //     {
    //         title: 'Frontend Development',
    //         description: 'some text',
    //         icon: frontendSvgIcon
    //     }, 
    //     {
    //         title: 'Backend Development',
    //         description: 'some text',
    //         icon: backendSvgIcon
    //     },
    // ];

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        id={props.id} 
        ref={props.ref} 
        className='container py-10 scroll-mt-20'
    >
        <motion.h4 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='text-center mb-2 text-base xxs:text-lg font-ovo '
        >
            What I offer
        </motion.h4>

        <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='h2 text-center font-ovo'
        >
                My Services
        </motion.h2>

        <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className='w-full max-w-[500px] text-sm xxs:text-base text-center mx-auto mt-5 mb-6 xxs:mb-12 font-ovo'
        >
            I offer a range of services to help you achieve your goals.
        </motion.p>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className='grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] xxs:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-6 my-5 xxs:my-10'
        >
            {
                serviceData.map(({icon, title, description, link}, index) => (
                    <motion.div 
                        whileHover={{ scale: 1 }}
                        key={index}
                        className='border border-gray-400 rounded-lg px-2 xxs:px-8 py-6 xxs:py-12 hover:shadow-shadowblack 
                        cursor-pointer hover:-translate-y-1 duration-300 dark:hover:shadow-white'
                    >
                        <div className={`w-12 p-2 rounded-lg bg-[#ff388b] text-white`}>
                            {icon}
                        </div>

                        <h3 className='text-lg my-3 xxs:my-5 dark:text-white'>{title}</h3>

                        <p className='text-sm text-gray-600 leading-5 dark:text-white/80'>{description}</p>

                        <a 
                            href={link}
                            className='flex items-center gap-2 text-sm font-medium mt-5'
                        >
                            Read more <Image src={assets.right_arrow} alt='' className='w-4' />
                        </a>
                    </motion.div>
                ))
            }
        </motion.div>
    </motion.div>
  )
}

export default Services