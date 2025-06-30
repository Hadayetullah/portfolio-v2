import React from 'react'

type Props = {}

const Form = (props: Props) => {
    const inputStyle = `flex h-[48px] border-[0.5px] border-black/20 dark:border-white/20 focus:border-primarylight/50 dark:focus:border-secondary/50 px-4 py-5 text-base text-black 
    dark:text-white placeholder:text-black/60 dark:placeholder:text-white/60 outline-none bg-white 
    dark:bg-[#1c1c22] rounded-md`;

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
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
        <input 
            type='email' 
            name='email' 
            placeholder='Email address'
            className={inputStyle}
        />
        <input 
            type='text' 
            name='phone' 
            placeholder='Phone number'
            className={inputStyle}
        />

        <textarea 
            name='message' 
            placeholder='Type your message here...'
            className={`${inputStyle} col-span-1 lg:col-span-2 h-[160px] resize-none`}
        />

        <button 
            className='max-w-40 border border-black/30 text-black/95 cursor-pointer rounded py-1 
            dark:border-secondary/50 dark:text-secondary/95'
        >Send Message</button>
    </div>
  )
}

export default Form