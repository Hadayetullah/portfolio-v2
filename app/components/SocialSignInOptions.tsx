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
  {
    icon: <FaLinkedinIn title='Sign in with Linkedin' />,
    provider: 'linkedin'
  },
  {
    icon: <FiGithub title='Sign in with GitHub' />,
    provider: 'github'
  },
]

type Props = {}

const SocialSignInOptions = (props: Props) => {
  return (
    <div className='flex items-center justify-start gap-4 text-[25px]'>
        <button 
            onClick={async(e) => {
                e.preventDefault();
                await socialLogin("google");
            }} 
            className='cursor-pointer'
        >
            <FaGoogle title='Sign in with Google' />
        </button>

        <button 
            onClick={async(e) => {
                e.preventDefault();
                await socialLogin("facebook");
            }} 
            className='cursor-pointer'
        >
            <FaFacebookF title='Sign in with Facebook' />
        </button>

        <button 
            onClick={async(e) => {
                e.preventDefault();
                await socialLogin("linkedin");
            }} 
            className='cursor-pointer'
        >
            <FaLinkedinIn title='Sign in with Linkedin' />
        </button>

        <button 
            onClick={async(e) => {
                e.preventDefault();
                await socialLogin("github");
            }} 
            className='cursor-pointer'
        >
            <FiGithub title='Sign in with GitHub' />
        </button>
    </div>
  )
}

export default SocialSignInOptions