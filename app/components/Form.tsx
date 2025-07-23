'use client'

import React, { useEffect, useState } from 'react'
import SelectField from './SelectField';
import UserVerificationField from './UserVerificationField';
import { getAuthInfo } from '../actions/getAuthInfo';

type Props = {
    isDarkMode: boolean
}

const Form = (props: Props) => {
    const [verifiedInfo, setVerified] = useState<any>(null);
    
    useEffect(() => {
        // Fetch authentication information when the component mounts
        const promise = getAuthInfo();
        promise.then((credentials) => {
            console.log("Credentials : ", credentials);
            setVerified(credentials);
        })
    }, [])


    // Social icons
    const googleIcon = <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0 1 16.42 6.5L19.9 3A11.97 11.97 0 0 0 1.24 6.65l4.03 3.11Z"/><path fill="#34A853" d="M16.04 18.01A7.4 7.4 0 0 1 12 19.1a7.08 7.08 0 0 1-6.72-4.82l-4.04 3.06A11.96 11.96 0 0 0 12 24a11.4 11.4 0 0 0 7.83-3l-3.79-2.99Z"/><path fill="#4A90E2" d="M19.83 21c2.2-2.05 3.62-5.1 3.62-9 0-.7-.1-1.47-.27-2.18H12v4.63h6.44a5.4 5.4 0 0 1-2.4 3.56l3.8 2.99Z"/><path fill="#FBBC05" d="M5.28 14.27a7.12 7.12 0 0 1-.01-4.5L1.24 6.64A11.93 11.93 0 0 0 0 12c0 1.92.44 3.73 1.24 5.33l4.04-3.06Z"/></svg>
    const facebookIcon = <svg className='w-full h-full' xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256"><path fill="#1877F2" d="M256 128a128 128 0 1 0-148 126.4V165H75.5v-37H108V99.8c0-32 19.1-49.8 48.3-49.8 14 0 28.7 2.5 28.7 2.5V84h-16.1c-16 0-20.9 9.9-20.9 20v24h35.5l-5.7 37H148v89.4A128 128 0 0 0 256 128"/><path fill="#FFFFFF" d="m177.8 165 5.7-37H148v-24c0-10.1 5-20 20.9-20H185V52.5S170.4 50 156.3 50C127.1 50 108 67.7 108 99.8V128H75.5v37H108v89.4a129 129 0 0 0 40 0V165h29.8"/></svg>
    const githubIcon = <svg className='w-full h-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill={`${props.isDarkMode ? '#ffffff' : ''}`} d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3"/></svg>
    
    // Provider information array
    const providerInfo = [
        {
            icon: googleIcon,
            provider: 'google',
            title: 'Sign in with Google',
            title2: 'Google account'
        },
        {
            icon: facebookIcon,
            provider: 'facebook',
            title: 'Sign in with Facebook',
            title2: 'Facebook account'
        },
        {
            icon: githubIcon,
            provider: 'github',
            title: 'Sign in with GitHub',
            title2: 'GitHub account'
        },
    ];

    const inputStyle = `flex h-[35] xxs:h-[42px] xs:h-[48px] border-[0.5px] border-black/20 
        dark:border-white/20 focus:border-primarylight/50 dark:focus:border-secondary/50 px-1 xxs:px-4 py-2 
        xxs:py-5 text-base text-black dark:text-white placeholder:text-black/60 dark:placeholder:text-white/60 
        outline-none bg-white dark:bg-[#1c1c22] rounded-md placeholder:text-sm xxs:placeholder:text-base shadow-sm`;

    const textAreaStyle = `flex border-[0.5px] border-black/20 dark:border-white/20 focus:border-primarylight/50 dark:focus:border-secondary/50 px-1 xxs:px-4 py-2 xxs:py-5 text-base text-black 
        dark:text-white placeholder:text-black/60 dark:placeholder:text-white/60 outline-none bg-white 
        dark:bg-[#1c1c22] rounded-md placeholder:text-sm xxs:placeholder:text-base`;

    const UserVerificationFieldStyle = `h-auto sm:h-[48px] border-[0.5px] border-black/20 dark:border-white/20 focus:border-primarylight/50 dark:focus:border-secondary/50 text-base text-black 
        dark:text-white placeholder:text-black/60 dark:placeholder:text-white/60 outline-none bg-white 
        dark:bg-[#1c1c22] rounded-md placeholder:text-sm xxs:placeholder:text-base shadow-sm`

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 xxs:gap-6'>
        <input 
            type='text' 
            name='firstname' 
            placeholder='First name'
            className={inputStyle}
        />
        <input 
            type='text' 
            name='lastname' 
            placeholder='Last name'
            className={inputStyle}
        />
        {/* <input 
            type='email' 
            name='email' 
            placeholder='Email address'
            className={inputStyle}
        /> */}
        <input 
            type='text' 
            name='phone' 
            placeholder='Phone number'
            className={inputStyle}
        />

        {/* Custom SelectField component */}
        <div className=''>
            <SelectField fieldStyle={inputStyle} />
        </div>

        {/* User Verification Field */}
        <div className='col-span-1 sm:col-span-2'>
            <UserVerificationField UserVerificationFieldStyle={UserVerificationFieldStyle} providerInfo={providerInfo} />
        </div>

        <textarea 
            name='message' 
            placeholder='Type your message here...'
            className={`${textAreaStyle} col-span-1 sm:col-span-2 h-[140px] xxs:h-[160px] resize-none`}
        />

        <button 
            className='max-w-40 border border-black/30 text-black/95 cursor-pointer rounded py-1 
            dark:border-secondary/50 dark:text-secondary/95'
        >
            Send Message
        </button>
    </div>
  )
}

export default Form