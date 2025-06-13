import React from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { assets } from '@/assets/assets'

type Props = {}

const Photo = (props: Props) => {
  return (
    <div className='w-full h-full pb-5 lg:pb-0'>
        <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true, amount: 0.5 }}
            className='w-[160px] h-[160px] xs:w-[298px] xs:h-[298px] xl:w-[400px] xl:h-[400px] bg-[#264166] dark:bg-transparent rounded-full shadow-[0px_0px_20px_#c6d6ee] dark:shadow-none overflow-hidden flex items-center justify-center'
            // className='w-35 h-35 bg-[#E4E0DC] rounded-full overflow-hidden flex items-start justify-center'
        >
            <Image src={assets.profile_img} alt='' quality={100} className='pt-5 px-2 xl:pt-7 xl:px-0 object-contain' />
        </motion.div>
    </div>
  )
}

export default Photo