import React, { ForwardedRef } from 'react'
import { motion } from 'motion/react';

import {FaPhoneAlt, FaEnvelope, FaMapMarkerAlt} from 'react-icons/fa'
import Form from './Form';

type Props = {
    isDarkMode: boolean;
    id: string;
    ref: ForwardedRef<HTMLDivElement>;
}

const infor = [
    {
        icon: <FaPhoneAlt />,
        title: "Phone",
        description: "(880) 1846 857 388",
    },
     {
        icon: <FaEnvelope />,
        title: "Email",
        description: "hadayetullah30@gmail.com",
    },
     {
        icon: <FaMapMarkerAlt />,
        title: "Address",
        description: "Sirajganj, Rajshahi, Bangladesh",
    },
];

const Contactme = (props: Props) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id={props.id} 
      ref={props.ref} 
      className='container py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat 
      bg-center bg-[90%_auto] dark:bg-none'
  >
      <motion.h4 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='text-center mb-2 text-base xxs:text-lg font-ovo'
      >
          Contact with me
      </motion.h4>

      <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='h2 text-center font-ovo'
      >
          Get in touch
      </motion.h2>

      <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className='w-full max-w-[500px] text-sm xxs:text-base text-center mx-auto mt-5 mb-6 xxs:mb-12 font-ovo'
      >
          I'd love to hear from you! If you have any questions, comments or feedback, please use the 
          form below.
      </motion.p>

      <div className='flex flex-col lg:flex-row gap-[30px]'>
        {/* Form */}
        <div className='order-2 lg:order-none'>
          <form 
            className='flex flex-col gap-6 p-10 dark:bg-[#27272c] rounded-xl'
          >
            <h3 className='text-4xl text-black dark:text-secondary'>Let's work together</h3>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, voluptas voluptate soluta amet dolores veniam doloremque eligendi molestias, excepturi aperiam fugit ratione saepe voluptatum sapiente modi illum! Aut, soluta! Officia?</p>

            <div>
              <Form />
            </div>
          </form>
        </div>

        {/* Info */}
        <div className='flex-1 flex items-center lg:justify-end order-1 lg:order-none mb-8 lg:mb-0'>Info</div>
      </div>
    </motion.div>
  )
}

export default Contactme