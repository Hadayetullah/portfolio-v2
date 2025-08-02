import React from 'react'

import { socialLogin } from '@/app/actions/SocialAuth'
import { ProviderInfoType } from './UserVerificationField';

type Props = {
  providerInfo: ProviderInfoType[];
  handleSocialLogin: (e: React.FormEvent, provider: string) => Promise<void>;
}

const SocialSignInOptions = ({providerInfo, handleSocialLogin}: Props) => {
  return (
    <div className='flex items-center justify-start gap-4'>
      {
        providerInfo.map((item, index) => (
          <button 
            key={index} 
            title={item.title}
            onClick={(e) => handleSocialLogin(e, item.provider)}

            className='w-7 h-7 cursor-pointer flex items-center justify-end'
          >
            {item.icon}
          </button>
        ))
      }
    </div>
  )
}

export default SocialSignInOptions