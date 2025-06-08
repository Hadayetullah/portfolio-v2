import React from 'react'
import { motion } from 'motion/react';

import { FaGithub, FaLinkedinIn, FaFacebookF } from 'react-icons/fa'

type Props = {
    containerStyles: string;
    iconStyles: string;
}

const socials = [
    { icon:<FaGithub />, link: "" },
    { icon:<FaLinkedinIn />, link: "" },
    { icon:<FaFacebookF />, link: "" },
]

const Social = (props: Props) => {
  return (
    <motion.div 
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        viewport={{ once: true, amount: 0.5 }}
        className={props.containerStyles}
    >
        {socials.map((item, index) => (
            <a key={index} target='_blank' href={item.link} className={props.iconStyles}>
                {item.icon}
            </a>
        ))}
    </motion.div>
  )
}

export default Social