import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";

import { socialLogin } from '@/app/actions/SocialAuth'

const content = [
  {
    icon: <FaGoogle title='Sign in with Google' />,
    provider: 'google'
  },
  {
    icon: <FaFacebookF title='Sign in with Facebook' />,
    provider: 'facebook'
  },
  // {
  //   icon: <FaLinkedinIn title='Sign in with Linkedin' />,
  //   provider: 'linkedin'
  // },
  {
    icon: <FiGithub title='Sign in with GitHub' />,
    provider: 'github'
  },
]

type Props = {
  authInfo?: {icon: React.ReactNode; provider: string}[];
}

const SocialSignInOptions = ({authInfo=content}: Props) => {
  return (
    <div className='flex items-center justify-start gap-4'>
      {
        authInfo.map((item, index) => (
          <button 
            key={index} 
            onClick={async(e) => {
              e.preventDefault();
              await socialLogin(item.provider);
            }}
            className='cursor-pointer text-[22px] rounded-full p-1.5 border-[0.5px] border-black/50 
            dark:border-white/50 hover:border-primarylight hover:text-primarylight 
            dark:hover:border-secondary dark:hover:text-secondary duration-300'
          >
            {item.icon}
          </button>
        ))
      }
    </div>
  )
}

export default SocialSignInOptions