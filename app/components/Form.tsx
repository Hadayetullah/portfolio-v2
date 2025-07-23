import React, { useEffect } from 'react'
import SelectField from './SelectField';
import UserVerificationField from './UserVerificationField';
import { googleLoginCredential } from '../actions/AccountCredentials';

type Props = {
    isDarkMode: boolean
}

const Form = (props: Props) => {

    useEffect(() => {
        const promise = googleLoginCredential();
        promise.then((credentials) => {
            console.log("Credentials : ", credentials)
        })
    }, [])

    const inputStyle = `flex h-[35] xxs:h-[42px] xs:h-[48px] border-[0.5px] border-black/20 
    dark:border-white/20 focus:border-primarylight/50 dark:focus:border-secondary/50 px-1 xxs:px-4 py-2 
    xxs:py-5 text-base text-black dark:text-white placeholder:text-black/60 dark:placeholder:text-white/60 
    outline-none bg-white dark:bg-[#1c1c22] rounded-md placeholder:text-sm xxs:placeholder:text-base shadow-sm`;

    const textAreaStyle = `flex border-[0.5px] border-black/20 dark:border-white/20 focus:border-primarylight/50 dark:focus:border-secondary/50 px-1 xxs:px-4 py-2 xxs:py-5 text-base text-black 
    dark:text-white placeholder:text-black/60 dark:placeholder:text-white/60 outline-none bg-white 
    dark:bg-[#1c1c22] rounded-md placeholder:text-sm xxs:placeholder:text-base`;

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
            <UserVerificationField isDarkMode={props.isDarkMode} />
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