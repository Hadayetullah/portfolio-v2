import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { ForwardedRef } from 'react'
import { motion } from 'motion/react'

type Props = {
    isDarkMode: boolean;
    id: string;
    ref: ForwardedRef<HTMLDivElement>;
}

const Contact = (props: Props) => {
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        id={props.id} 
        ref={props.ref} 
        className='container py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat 
        bg-center bg-[90%_auto] dark:bg-none'
    >
        <motion.h4 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='text-center mb-2 text-lg font-ovo'
        >
            Contact with me
        </motion.h4>

        <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='text-5xl text-center font-ovo'
        >
            Get in touch
        </motion.h2>

        <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo'
        >
            I'd love to hear from you! If you have any questions, comments or feedback, please use the 
            form below.
        </motion.p>

        <motion.form 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className='max-w-2xl mx-auto'
        >
            <div className='grid grid-cols-[var(--grid-auto)] gap-6 mt-10 mb-8'>
                <motion.input 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    type="text" 
                    name="" 
                    id="" 
                    placeholder='Enter your name' 
                    required 
                    className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white 
                    dark:bg-darkhover/30 dark:border-white/90' 
                />
                
                <motion.input 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    type="email" 
                    name="" 
                    id="" 
                    placeholder='Enter your email' 
                    required 
                    className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white 
                    dark:bg-darkhover/30 dark:border-white/90' 
                />
            </div>

            <motion.textarea 
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                name="" 
                id="" 
                rows={6} 
                placeholder='Enter your message' 
                required
                className='w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6 
                dark:bg-darkhover/30 dark:border-white/90'
            ></motion.textarea>

            <motion.button 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                type='submit' 
                className='cursor-pointer py-3 px-8 w-max flex items-center justify-between gap-2 
                bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 dark:bg-transparent 
                dark:border-[0.5px] dark:hover:bg-darkhover'
            >
                Submit now <Image src={assets.right_arrow_white} alt='' className='w-4' />
            </motion.button>
        </motion.form>
    </motion.div>
  )
}

export default Contact