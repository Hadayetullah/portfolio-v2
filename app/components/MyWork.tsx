'use client'

import { assets, workData } from '@/assets/assets'
import Image from 'next/image'
import React, { ForwardedRef, useState } from 'react'
import { motion } from 'motion/react'
import 'swiper/css';

import { BsArrowUpRight, BsGithub, } from "react-icons/bs";

import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'
import WorkSliderBtns from './WorkSliderBtns'

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
        category: "Full-stack",
        title: "Project two",
        description: 
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae ut necessitatibus ratione voluptates quibusdam id quo vitae qui, aliquid voluptatem at aut aspernatur.",
        stack: ["HTML", "CSS", "JavaScript"],
        image: "/work/thumb2.png",
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
        image: "/work/thumb3.png",
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

    const handleSlideChange = (swiper:any) => {
        const currentIndex = swiper.activeIndex;
        setProject(projects[currentIndex]);
    }

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
        id={props.id} 
        ref={props.ref} 
        className='container py-10 scroll-mt-20'
    >
        <motion.h4 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-center mb-2 text-base xxs:text-lg font-ovo'
        >
            My Portfolio
        </motion.h4>

        <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='h2 text-center font-ovo'
            >
                My latest work
        </motion.h2>

        <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='w-full max-w-[500px] text-sm xxs:text-base text-center mx-auto mt-5 mb-6 xxs:mb-12 font-ovo'
        >
            Welcome to my web development portfolio! Explore a collection of projects showcasing
            my expertise in web development.
        </motion.p>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='my-10 w-full flex flex-col lg:flex-row gap-[30px] pt-2 lg:pt-10'
        >
            {/* Project details section */}
            <div className='w-full lg:w-[50%] lg:h-[460px] flex flex-col lg:justify-between order-2 lg:order-none '>
                <div className='flex flex-col gap-[10px] xs:gap-[20px]'>
                    <div 
                        className='text-4xl xxs:text-6xl xs:text-8xl font-bold text-transparent text-shadow-neutral-50' 
                        style={{ WebkitTextStroke: `2px var(--color-${props.isDarkMode ? 'secondary' : 'primarylight'})`}}
                    >
                        {project.num}
                    </div>

                    <h2 
                        className='text-[20px] xxs:text-[30px] xs:text-[42px] font-medium transition-all duration-300 
                        capitalize '
                    >
                        {project.category} project
                    </h2>

                    <p className='py-2 xs:py-4 text-sm xxs:text-base leading-[1.5] text-black/80 dark:text-white/80'>
                        {project.description}
                    </p>

                    <ul className='w-full flex flex-wrap gap-1 xxs:gap-2 xs:gap-4 leading-[1.2] xs:leading-[1.5] text-base xxs:text-lg xs:text-xl text-primarylight dark:text-secondary'>
                        {
                            project.stack.map((item:string, index:number) => (
                                <li key={index}>
                                    {item}{index !== project.stack.length - 1 && ','}
                                </li>
                            ))
                        }
                    </ul>

                    <div className='border border-black/20 dark:border-white/20'></div>

                    {/* Linked buttons */}
                    <div className='flex items-center gap-4'>
                        <div className='w-10 xxs:w-13 h-10 xxs:h-13 rounded-full bg-gray-300 dark:bg-secondarydarklight text-black dark:text-secondary'>
                            <Link 
                                href={project.live} 
                                title='Live Project'
                                target='_blank'
                            >
                                <BsArrowUpRight aria-label='Live Project' className='w-full h-auto p-3' />
                            </Link>
                        </div>

                        <div className='w-10 xxs:w-13 h-10 xxs:h-13 rounded-full bg-gray-300 dark:bg-secondarydarklight text-black dark:text-secondary'>
                            <Link 
                                href={project.live} 
                                title='GitHub Repository'
                                target='_blank'
                            >
                                <BsGithub aria-label='GitHub Repository' className='w-full h-auto p-3' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Swiper slider section */}
            <div className='w-full lg:w-[50%]'>
                <Swiper 
                    slidesPerView={1} 
                    spaceBetween={30}
                    className='w-full h-[300px] xxs:h-[410px] xs:h-[520px]'
                    onSlideChange={handleSlideChange}
                >
                    {
                        projects.map((project, index) => {
                            return (
                                <SwiperSlide 
                                    key={index}
                                >
                                    <div 
                                        className='relative w-full h-full xs:h-[460px] flex items-center 
                                        cursor-grab justify-center'>
                                        {/* Overlay */}
                                        <div className='absolute inset-0 bg-black/10 z-10'></div>

                                        <div className='relative w-full h-full'>
                                            <Image src={project.image} alt='' fill className='object-cover' />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }

                    {/* Slider buttons */}
                    <WorkSliderBtns />
                </Swiper>
            </div>
        </motion.div>
    </motion.div>
  )
}

export default MyWork