'use client'

import React, { ForwardedRef, useState } from 'react'
import Image from 'next/image';

import { motion } from 'motion/react'

import { SiFrontendmentor, SiBackendless } from "react-icons/si";
// import { backendSvgIcon, frontendSvgIcon } from '../../assets/svgIcons';
import { assets, serviceData } from '@/assets/assets';
import ServiceModal from './ServiceModal';

type Props = {
    isDarkMode: boolean;
    id: string;
    ref: ForwardedRef<HTMLDivElement>;
}

export type ServiceModalDataType = {
    mainTitle: string;
    modalData: {
        title: string;
        description: string;
    }[];
}

const Services = (props: Props) => {

    const icons = [
        SiFrontendmentor, SiBackendless
    ]

    const [serviceModalOpen, setServiceModalOpen] = useState<boolean>(false);
    const [serviceModalData, setServiceModalData] = useState<ServiceModalDataType | null>(null);

    const handleServiceModal = (title: string, modalData: {title: string, description: string}[]) => {
        setServiceModalData({mainTitle: title, modalData: modalData});
        setServiceModalOpen(true);
    }

    const handleServiceModalClose = () => {
        // setServiceModalData(null);
        setServiceModalOpen(false);
    }

  return (
    <>
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            id={props.id} 
            ref={props.ref} 
            className='container mt-1 py-10 scroll-mt-20'
        >
            {/* Subheading */}
            <motion.h4 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='text-center mb-2 text-base xxs:text-lg font-ovo'
            >
                What I offer
            </motion.h4>

            {/* Main heading */}
            <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className='h2 text-center font-ovo'
            >
                    My Services
            </motion.h2>

            {/* Introductory paragraph */}
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className='w-full max-w-[500px] text-sm xxs:text-base text-center mx-auto mt-5 mb-6 xxs:mb-12 font-ovo'
            >
                I offer a range of services to help you achieve your goals.
            </motion.p>

            {/* Services info */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className='grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] xxs:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-6 my-5 xxs:my-10'
            >
                {
                    serviceData.map(({title, description, modalData}, index) => {
                        const Icon = icons[index];
                        return (
                            <motion.div 
                                whileHover={{ scale: 1 }}
                                key={index} 
                                role='button' 
                                onClick={() => handleServiceModal(title, modalData)}
                                className='border border-gray-400 rounded-lg px-2 xxs:px-8 py-6 xxs:py-12 hover:shadow-shadowblack 
                                cursor-pointer hover:-translate-y-1 duration-300 dark:hover:shadow-white'
                            >
                                <div aria-hidden="true" className={`w-12 p-2 flex items-center justify-center border border-transparent dark:border-secondary rounded-lg bg-[#ff388b] dark:bg-transparent dark:text-secondary text-white`}>
                                    <Icon className='w-8 h-8' />
                                </div>

                                <h3 className='text-lg my-3 xxs:my-5 dark:text-white'>{title}</h3>

                                <p className='text-sm sm:text-base lg:text-lg text-gray-600 leading-5 dark:text-white/80'>{description}</p>

                                <button 
                                    onClick={() => handleServiceModal(title, modalData)}
                                    className='flex items-center gap-2 text-sm font-medium mt-5 cursor-pointer'
                                >
                                    Services I provide <Image src={assets.right_arrow} alt='Arrow right direction' className='w-4' />
                                </button>
                            </motion.div>
                        )
                    })
                }
            </motion.div>
        </motion.div>

        {/* Service Modal */}
        { serviceModalOpen && serviceModalData !== null && (
            <ServiceModal 
                serviceModalData={serviceModalData} 
                handleServiceModalClose={handleServiceModalClose} 
            />
        )}
    </>
  )
}

export default Services