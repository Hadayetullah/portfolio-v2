import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

type Props = {
    isDarkMode: boolean;
}

const Contact = (props: Props) => {
  return (
    <div 
        id="contact" 
        className='w-full px-[12%] py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat 
        bg-center bg-[90%_auto] dark:bg-none'
    >
        <h4 className='text-center mb-2 text-lg font-ovo'>Contact with me</h4>

        <h2 className='text-5xl text-center font-ovo'>Get in touch</h2>

        <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo'>
            I'd love to hear from you! If you have any questions, comments or feedback, please use the 
            form below.
        </p>

        <form className='max-w-2xl mx-auto'>
            <div className='grid grid-cols-[var(--grid-auto)] gap-6 mt-10 mb-8'>
                <input 
                    type="text" 
                    name="" 
                    id="" 
                    placeholder='Enter your name' 
                    required 
                    className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white 
                    dark:bg-darkhover/30 dark:border-white/90' 
                />
                
                <input 
                    type="email" 
                    name="" 
                    id="" 
                    placeholder='Enter your email' 
                    required 
                    className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white 
                    dark:bg-darkhover/30 dark:border-white/90' 
                />
            </div>

            <textarea 
                name="" 
                id="" 
                rows={6} 
                placeholder='Enter your message' 
                required
                className='w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6 
                dark:bg-darkhover/30 dark:border-white/90'
            ></textarea>

            <button 
                type='submit' 
                className='cursor-pointer py-3 px-8 w-max flex items-center justify-between gap-2 
                bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 dark:bg-transparent 
                dark:border-[0.5px] dark:hover:bg-darkhover'
            >
                Submit now <Image src={assets.right_arrow_white} alt='' className='w-4' />
            </button>
        </form>
    </div>
  )
}

export default Contact