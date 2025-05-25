'use client'

import React from 'react'
// import { backendSvgIcon, frontendSvgIcon } from '../../assets/svgIcons';
import { assets, serviceData } from '@/assets/assets';
import Image from 'next/image';

type Props = {}

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
    <div id="services" className='w-full px-[12%] py-10 scroll-mt-20 '>
        <h4 className='text-center mb-2 text-lg font-ovo '>What I offer</h4>

        <h2 className='text-5xl text-center font-ovo '>My Services</h2>

        <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo '>
            I offer a range of services to help you achieve your goals.
        </p>

        <div className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-6 my-10'>
            {
                serviceData.map(({icon, title, description, link}, index) => (
                    <div 
                        key={index}
                        className='border border-gray-400 rounded-lg px-8 py-12 hover:shadow-shadowblack cursor-pointer hover:bg-lighthover hover:-translate-y-1 duration-500'
                    >
                        <div className={`w-12 p-2 rounded-lg bg-[#ff388b] text-white`}>
                            {icon}
                        </div>

                        <h3 className='text-lg my-5 text-gray-700'>{title}</h3>

                        <p className='text-sm text-gray-600 leading-5'>{description}</p>

                        <a 
                            href={link}
                            className='flex items-center gap-2 text-sm mt-5'
                        >
                            Read more <Image src={assets.right_arrow} alt='' className='w-4' />
                        </a>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Services