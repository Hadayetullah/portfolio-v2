import React from 'react'
import { socialLogin } from '@/app/actions/SocialAuth'

type Props = {}

const SocialSignInOptions = (props: Props) => {
  return (
    <div>
        <button 
            onClick={(e) => {
                e.preventDefault();
                socialLogin("google");
            }}
            className='cursor-pointer'
        >
            Google
        </button>
    </div>
  )
}

export default SocialSignInOptions