import React, { ForwardedRef } from 'react'
import { motion } from 'motion/react'; // Framer Motion animations

import {FaPhoneAlt, FaEnvelope, FaMapMarkerAlt} from 'react-icons/fa'
import Form from './Form';

type Props = {
    isDarkMode: boolean;
    id: string;
    ref: ForwardedRef<HTMLDivElement>;
    activeSection: string;
    setNotifiableMessage: (value: string) => void;
    setMessageModal: (value: boolean) => void;
}

// Contact information array
const info = [
    {
        icon: <FaPhoneAlt />,
        title: "Phone",
        description: "(880) 1846 857 388",
        ariaLabel: "Phone number"
    },
     {
        icon: <FaEnvelope />,
        title: "Email",
        description: "hadayetullah30@gmail.com",
        ariaLabel: "Email address"
    },
     {
        icon: <FaMapMarkerAlt />,
        title: "Address",
        description: "Sirajganj, Rajshahi, Bangladesh",
        ariaLabel: "Physical address"
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
    {/* Subheading */}
      <motion.h4 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='text-center mb-2 text-base xxs:text-lg font-ovo'
      >
          Contact with me
      </motion.h4>

      {/* Main heading */}
      <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='h2 text-center font-ovo'
      >
          Get in touch
      </motion.h2>

      {/* Introductory paragraph */}
      <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className='w-full max-w-[500px] text-sm xxs:text-base text-center mx-auto mt-5 mb-6 xxs:mb-12 font-ovo'
      >
          I'd love to hear from you! If you have any questions, comments or feedback, please use the 
          form below.
      </motion.p>

      {/* Flex container for Form and Contact Info */}
      <div className='flex flex-col lg:flex-row gap-[30px] items-center'>
        {/* Form section */}
        <div className='order-2 lg:order-none flex justify-end'>
          <div 
            className='flex flex-col gap-3 xxs:gap-6 p-0 sm:p-4 lg:p-10 dark:bg-[#27272c] rounded-xl'
          >
            {/* Form heading */}
            <h3 className='text-2xl xxs:text-3xl xs:text-4xl xxs:leading-[1] text-black dark:text-secondary'>Let's work together</h3>

            {/* Form subheading */}
            <p className='text-sm xxs:text-base font-ovo'>
              Whether you have a project in mind or just want to say hello, I'm here to help! Just fill out the form, and I'll get back to you as soon as possible.
            </p>

            {/* Form component */}
            <div>
              <Form 
                isDarkMode={props.isDarkMode} 
                activeSection={props.activeSection} 
                setNotifiableMessage={props.setNotifiableMessage} 
                setMessageModal={props.setMessageModal} 
              />
            </div>
          </div>
        </div>

        {/* Contact Information List */}
        <div className='flex-1 flex items-center lg:justify-start order-1 lg:order-none mb-3 xxs:mb-8 lg:mb-0'>
          <ul className='flex flex-col gap-5 xs:gap-10'>
            {
              info.map((item, index) => {
                return (
                  <li 
                    key={index}
                    className='flex items-center gap-0 xxs:gap-2 xs:gap-6'
                  >
                    {/* Icon container (visible only above xxs breakpoint) */}
                    <div 
                      className='hidden w-[40px] xs:w-[52px] xl:w-[60px] h-[40px] xs:h-[52px] xl:h-[60px] border border-primarylight/30 dark:border-[#1c1c22] dark:bg-[#1c1c22] text-primarylight dark:text-secondary 
                      rounded-md xxs:flex items-center justify-center'
                    >
                      <div aria-hidden='true' className='w-[40px] xs:w-[52px] xl:w-[60px] flex items-center justify-center text-[20px] xs:text-[28px]'>{item.icon}</div>
                    </div>

                    {/* Text info */}
                    <div className='flex-1 flex flex-col gap-0 xxs:gap-1'>
                      <div className='flex flex-row gap-1 items-center'>
                        {/* Inline icon on small screens */}
                        <div 
                          aria-hidden='true' 
                          className='text-sm xxs:hidden text-primarylight dark:text-secondary'
                        >
                            {item.icon}
                        </div>
                        <p className='text-sm xs:text-base text-black/60 dark:text-white/60'>{item.title}</p>
                      </div>
                      <h3 className='text-sm xs:text-lg text-black/85 dark:text-white/85'>{item.description}</h3>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default Contactme