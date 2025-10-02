import React from 'react'

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
            disabled={item.provider === 'facebook' || item.provider === 'linkedin'}

            className={`w-7 h-7 flex items-center justify-end rounded-full ${item.provider === 'facebook' || item.provider === 'linkedin' ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer opacity-100'}`}
          >
            {item.icon}
          </button>
        ))
      }
    </div>
  )
}

export default SocialSignInOptions