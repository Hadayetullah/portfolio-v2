'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import SocialSignInForm from './SocialSignInOptions'

// options array for the select field to select verification type
const options = [
  { label: 'User verification with social account', value: 'social' },
  { label: 'User verification with email (manually)', value: 'manual' },
]

type Props = {
    optionsList?: { label: string, value: string }[];
}

const UserVerificationField = ({optionsList=options}: Props) => {

    const [selected, setSelected] = useState<{label: string, value:string} | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [openAbove, setOpenAbove] = useState<boolean>(false)
    const [belowPosition, setBelowPosition] = useState<number>(0)

    const containerRef = useRef<HTMLDivElement>(null);

    const handleSignIn = (e:any) => {
        e.preventDefault();
    }

    const handleSelect = (option:any) => {
        setSelected(option)
        setIsOpen(false)
        // onChange?.(option.value)
    }

    useEffect(() => {
        if (isOpen && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            const dropdownHeight = Math.min(100, optionsList.length * 48) // approx height

            if (spaceBelow < dropdownHeight + 10) {
                setOpenAbove(true)
            } else {
                const height = rect.height
                if (height > 50) {
                    const position = height/2;
                    setBelowPosition(position);
                } else {
                    setBelowPosition(0);
                }

                setOpenAbove(false);

            }
        }
    }, [isOpen, optionsList])

  return (
    <div ref={containerRef} className='relative w-full select-none'>
        <div 
            className='h-auto sm:h-[48px] border-[0.5px] border-black/20 dark:border-white/20 focus:border-primarylight/50 dark:focus:border-secondary/50 text-base text-black 
            dark:text-white placeholder:text-black/60 dark:placeholder:text-white/60 outline-none bg-white 
            dark:bg-[#1c1c22] rounded-md placeholder:text-sm xxs:placeholder:text-base shadow-sm flex 
            flex-col sm:flex-row items-center justify-between gap-1 sm:gap-6'
        >
            <div 
                onClick={() => setIsOpen(!isOpen)}
                role='button' 
                className='cursor-pointer select-none flex items-center justify-between w-full sm:w-[50%] 
                h-[35] xxs:h-[42px] xs:h-[48px] sm:h-full rounded-tl-md rounded-bl-none sm:rounded-bl-md rounded-tr-md sm:rounded-tr-none bg-gray-100'
            >
                <span className='min-w-[200px] max-w-full text-nowrap text-black/70 dark:text-white/70 px-1 xxs:pl-4'>{selected?.label || options[0].label}</span>
                <div className='bg-gray-100 w-[32px] h-full flex items-center justify-center ml-2 border-0 sm:border-r-[0.5px] border-black/20 dark:border-white/20'>
                    <FaChevronDown aria-label='Toggle dropdown' className={`text-black/60 dark:text-white/60 ${openAbove ? 'rotate-180' : ''}`} />
                </div>
            </div>

            <div className='bg-green-500 w-full sm:w-[50%] h-[35] xxs:h-[42px] xs:h-[48px] sm:h-full rounded-bl-md sm:rounded-bl-none rounded-tr-none sm:rounded-tr-md rounded-br-md px-1 xxs:pl-4 flex items-center'>
                {/* <button onClick={(e) => handleSignIn(e)}>Sign in</button> */}
                <SocialSignInForm />
            </div>
        </div>

        {isOpen && (
            <div
                className={`absolute z-10 w-full bg-white dark:bg-[#1c1c22] border border-black/20 dark:border-white/20 rounded-md shadow-lg max-h-60 overflow-auto ${
                    openAbove ? 'bottom-full mb-1' : 'mt-1'
                }`} 
                style={!openAbove && belowPosition > 0 ? { top: `${belowPosition - 4}px` } : {}}
            >
                {optionsList.map((option) => (
                    <div
                        key={option.value}
                        onClick={() => handleSelect(option)}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#202024] dark:hover:text-secondary/70 ${
                            selected?.value === option.value ? 'bg-gray-100 dark:bg-[#202024] font-semibold italic text-secondarylight dark:text-secondary' : 'text-black/80 dark:text-white/80'
                        }`}
                    >
                    {option.label}
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default UserVerificationField