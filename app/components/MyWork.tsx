'use client'

import { assets, workData } from '@/assets/assets'
import Image from 'next/image'
import React, { ForwardedRef, useState } from 'react'
import { motion } from 'motion/react'

import { Swiper, SwiperSlide } from 'swiper/react'

const projects = [
    {
        num: "01",
        category: "Frontend",
        title: "Project one",
        description: 
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae ut necessitatibus ratione voluptates quibusdam id quo vitae qui, aliquid voluptatem at aut aspernatur.",
        stack: ["HTML", "CSS", "JavaScript"],
        image: "/work/thumb1.png",
        live: "",
        github: "",
    },
    {
        num: "02",
        category: "Frontend",
        title: "Project two",
        description: 
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae ut necessitatibus ratione voluptates quibusdam id quo vitae qui, aliquid voluptatem at aut aspernatur.",
        stack: ["HTML", "CSS", "JavaScript"],
        image: "/work/thumb1.png",
        live: "",
        github: "",
    },
    {
        num: "03",
        category: "Frontend",
        title: "Project three",
        description: 
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae ut necessitatibus ratione voluptates quibusdam id quo vitae qui, aliquid voluptatem at aut aspernatur.",
        stack: ["HTML", "CSS", "JavaScript"],
        image: "/work/thumb1.png",
        live: "",
        github: "",
    },
];

type Props = {
    isDarkMode: boolean;
    id: string;
    ref: ForwardedRef<HTMLDivElement>;
}

const MyWork = (props: Props) => {
    const [project, setProject] = useState<any>(projects[0]);
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        id={props.id} 
        ref={props.ref} 
        className='w-full px-[12%] py-10 scroll-mt-20'
    >
        <motion.h4 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-center mb-2 text-lg font-ovo'
        >
            My Portfolio
        </motion.h4>

        <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-5xl text-center font-ovo'
            >
                My latest work
        </motion.h2>

        <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo'
        >
            Welcome to my web development portfolio! Explore a collection of projects showcasing
            my expertise in web development.
        </motion.p>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='my-10 w-full flex flex-col lg:flex-row lg:gap-[30px] pt-10'
        >
            <div className='w-full lg:h-[460px] flex flex-col lg:justify-between order-2 lg:order-none '>
                <div>
                    <div 
                        className='text-8xl leading-[1.2] font-bold text-transparent text-shadow-neutral-50' 
                        style={{ WebkitTextStroke: "2px var(--color-primarylight)"}}
                    >
                        {project.num}
                    </div>

                    <h2 
                        className='text-[42px] font-medium leading-[1] transition-all duration-300 
                        capitalize '
                    >
                        {project.category} project
                    </h2>

                    <p className='py-4 leading-[1.5] text-black/80 dark:text-white/80'>
                        {project.description}
                    </p>

                    <ul className='flex gap-4 text-xl text-primarylight'>
                        {
                            project.stack.map((item:string, index:number) => (
                                <li key={index}>
                                    {item} {index !== project.stack.length - 1 && ','}
                                </li>
                            ))
                        }
                    </ul>

                    <div className='border border-black/20 dark:border-white/20'></div>
                </div>
            </div>

            <div className='w-full'>Slider</div>
        </motion.div>
    </motion.div>
  )
}

export default MyWork