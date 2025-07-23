'use client'

import React from 'react'
import { ProviderInfoType } from './UserVerificationField';

type Props = {
  UserVerificationFieldStyle: string;
  providerInfo: ProviderInfoType[];
  verifiedInfo: any;
}

const AuthenticatedUser = (props: Props) => {
  return (
    <div className={props.UserVerificationFieldStyle + ' flex justify-between'}>
      <div 
        className='flex-1 flex flex-row items-center gap-3 h-[35] xxs:h-[42px] xs:h-[48px] sm:h-full 
        rounded-tl-md rounded-bl-none sm:rounded-bl-md rounded-tr-md sm:rounded-tr-none bg-gray-50 
        dark:bg-[#23232c] px-1 xxs:px-4'
      >
        {
          props.providerInfo.map((item, index) => {
            if (props.verifiedInfo?.provider === item.provider) {
              return (
                <div key={index} className='h-full flex items-center'>
                  <span 
                    aria-label={item.title2} 
                    className='w-7 h-7 flex items-center justify-center'
                  >
                    {item.icon}
                  </span>
                </div>
              )
            }
          })
        }

        <div className='flex flex-col justify-center'>
          <span className='text-black/80'>{props.verifiedInfo?.user?.name}</span>
          <span className='text-sm text-black/80'>{props.verifiedInfo?.user?.email}</span>
        </div>
      </div>

      <div 
        className='w-full xs:w-[100px] sm:w-[160px] h-[35] xxs:h-[42px] xs:h-[48px] sm:h-full rounded-none xs:rounded-tr-md xs:rounded-br-md 
        flex items-center bg-gray-100 dark:bg-[#23232c] border-t-[0.5px] xs:border-t-0 xs:border-l-[0.5px] border-black/20 dark:border-white/20'
      >
        <button className='w-full h-full select-none cursor-pointer px-1 xxs:px-2 xs:px-4 text-lg text-gray-800'>Cancel</button>
      </div>
    </div>
  )
}

export default AuthenticatedUser