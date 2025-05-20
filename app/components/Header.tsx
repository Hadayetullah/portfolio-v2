import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 '>
        <div className='w-35 h-35 bg-[#E4E0DC] rounded-full overflow-hidden flex items-start justify-center'>
            <Image src={assets.profile_img} alt='' className='w-32 ' />
        </div>

        <h3 className='flex items-end gap-2 text-xl md:text-2xl mb-3 font-ovo'>
            Hi! I'm Hadayetullah 
            <Image src={assets.hand_icon} alt='' className='w-6' />
        </h3>

        <h1 className='text-3xl sm:text-3xl lg:text-[66px] font-ovo'>
            Frontend web developer
        </h1>

        <p className='font-ovo mx-auto max-w-2xl leading-6 '>
            I am a frontend web developer with over 1 year of experience in building responsive and user 
            friendly websites. I have a strong passion for creating beautiful and functional web 
            applications using the latest technologies and best practices.
        </p>

        <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
            <a 
                href="#contact"
                className='px-10 py-3 flex items-center gap-2 border border-white rounded-full bg-black text-white ' 
            >
                Contact me
                <Image src={assets.right_arrow_white} alt='' className='w-4' />
            </a>

            <a 
                href="/Hadayetullah-CV.pdf" download
                className='px-10 py-3 flex items-center gap-2 border rounded-full border-gray-500 ' 
            >
                My resume
                <Image src={assets.download_icon} alt='' className='w-4' />
            </a>
        </div>
    </div>
  )
}

export default Header