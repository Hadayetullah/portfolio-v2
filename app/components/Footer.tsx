import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className='mt-20'>
        <div className='text-center'>
            <a href="#home" className='w-36 text-[28px] cursor-pointer mx-auto mb-2'>
                Hadayetullah
            </a>

            {/* <a href="">
                <Image src={assets.logo} alt='' className='w-36 cursor-pointer mx-auto mb-2'  />
            </a> */}

            <div className='w-max flex items-center gap-2 mx-auto'>
                <Image src={assets.mail_icon} alt='' className='w-6' />
                hadayetullah30@gmail.com
            </div>
        </div>

        <div className='text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6'>
            <p>@ 2025 Md. Hadayetullah. All rights reserved.</p>

            <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0'>
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