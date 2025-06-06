import React from 'react'

import { FaGithub, FaLinkedinIn, FaFacebook } from 'react-icons/fa'

type Props = {
    containerStyles: string;
    iconStyles: string;
}

const socials = [
    { icon:<FaGithub />, link: "" },
    { icon:<FaLinkedinIn />, link: "" },
    { icon:<FaFacebook />, link: "" },
]

const Social = (props: Props) => {
  return (
    <div className={props.containerStyles}>
        {socials.map((item, index) => (
            <a key={index} target='_blank' href={item.link} className={props.iconStyles}>
                {item.icon}
            </a>
        ))}
    </div>
  )
}

export default Social