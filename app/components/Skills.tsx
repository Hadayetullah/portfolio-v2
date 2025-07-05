import React from 'react'

import { 
    FaHtml5, 
    FaCss3, 
    FaJs, 
    FaReact, 
    FaPython,
} from "react-icons/fa";

import { 
    SiTailwindcss, 
    SiNextdotjs,
    SiTypescript,
    SiRedux,
    SiDjango,
    SiSqlite
} from "react-icons/si";

import { BiLogoPostgresql } from "react-icons/bi";

type Props = {}

// Skills data
const skills = {
    title: "My skills", 
    description: 
    "I have hands-on expertise in a range of core web technologies and tools. My skill set empowers me to design and build responsive, accessible, and maintainable user interfaces with modern frameworks and best practices.",
    skillList: [
        {
            icon: <FaHtml5 aria-label="html 5" />,
            name: "html 5"
        },
        {
            icon: <FaCss3 aria-label="css 3" />,
            name: "css 3"
        },
        {
            icon: <FaJs aria-label="JavaScript" />,
            name: "JavaScript"
        },
        {
            icon: <SiTypescript aria-label="TypeScript" />,
            name: "TypeScript"
        },
        {
            icon: <FaReact aria-label="React.js" />,
            name: "React.js"
        },
        {
            icon: <SiRedux aria-label="Redux" />,
            name: "Redux"
        },
        {
            icon: <SiNextdotjs aria-label="Next.js" />,
            name: "Next.js"
        },
        {
            icon: <SiTailwindcss aria-label="Tailwind CSS" />,
            name: "Tailwind css"
        },
        {
            icon: <FaPython aria-label="Python" />,
            name: "Python"
        },
        {
            icon: <SiDjango aria-label="Django" />,
            name: "Django"
        },
        {
            icon: <SiSqlite aria-label="SQLite" />,
            name: "SQLite"
        },
        {
            icon: <BiLogoPostgresql aria-label="PostgreSQL" />,
            name: "PostgreSQL"
        },
    ]
};

const Skills = (props: Props) => {
  return (
    <div className='w-full flex flex-col gap-[30px] text-center lg:text-left'>
        <div className='w-full flex flex-col gap-3 text-black/80 dark:text-white/90'>
            <h3 className='text-2xl font-semibold'>{skills.title}</h3>
            <p className='max-w-[600px] mx-auto lg:mx-0 text-sm xxs:text-base leading-[1.5]'>{skills.description}</p>
        </div>

        <ul className='h-[410px] grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 xxs:gap-4 xl:gap-[30px] overflow-auto rounded-xl'>
            {skills.skillList.map((item, index) => (
                <li key={index} 
                    className='relative h-[100px] pb-2 xs:h-[150px] w-full flex items-center 
                    justify-center rounded-xl bg-gray-100 dark:bg-[#232329] shadow-md cursor-pointer 
                    duration-300 hover:text-primarylight dark:hover:text-secondary'
                >
                    <span className='text-4xl xs:text-6xl'>
                        {item.icon}
                    </span>

                    <span 
                        className='absolute w-full left-0 bottom-2 text-center leading-[0.8] 
                        xs:leading-[1.5] text-sm xs:text-base'
                    >
                        {item.name}
                    </span>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Skills