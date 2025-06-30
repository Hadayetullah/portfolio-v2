import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

type Props = {
    isDarkMode: boolean;
}

const Footer = (props: Props) => {
  return (
    <div className='container mt-20'>
        <div className='text-center'>
            <a href="#home" className='w-36 text-[22px] xxs:text-[28px] xs:text-[32px] cursor-pointer mx-auto'>
                Hadayetullah
            </a>

            <div className='w-max flex items-center gap-1 xxs:gap-2 mx-auto text-[11px] xxs:text-sm xs:text-base mt-0 xxs:mt-1 xs:mt-2'>
                <Image src={props.isDarkMode ? assets.mail_icon_dark : assets.mail_icon} alt='' className='w-3 xxs:w-4 xs:w-6' />
                hadayetullah30@gmail.com
            </div>
        </div>

        <div className='text-center flex flex-col md:flex-row items-center justify-center xxs:justify-between border-t border-gray-400 mx-[5%] md:mx-[10%] mt-6 xxs:mt-12 py-6'>
            <p>@ 2025 Md. Hadayetullah. All rights reserved.</p>

            <ul className='flex flex-col xxs:flex-row items-center gap-1 xxs:gap-2 sm:gap-10 justify-center mt-4 sm:mt-0'>
                <li>
                    <a target='_blank' href="https://github.com/Hadayetullah">GitHub</a>
                </li>

                <li>
                    <a target='_blank' href="https://www.linkedin.com/in/md-hadayetullah-964672150/">Linkedin</a>
                </li>

                <li>
                    <a target='_blank' href="https://www.facebook.com/hadayet00/">Facebook</a>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Footer