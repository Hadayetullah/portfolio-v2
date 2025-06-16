import React, { ForwardedRef, ReactElement, useState } from 'react'
import { motion } from 'motion/react';

import { 
    FaHtml5, 
    FaCss3, 
    FaJs, 
    FaReact, 
    FaFigma, 
    FaNodeJs
} from "react-icons/fa";

import { 
    SiTailwindcss, 
    SiNextdotjs
} from "react-icons/si";
import Experience from './Experience';

type Props = {
    isDarkMode: boolean;
    id: string;
    ref: ForwardedRef<HTMLDivElement>;
}

type TabKey = 'experience' | 'education' | 'skills' | 'about';

// About data
const about = {
    title: "About me",
    description: 
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis non quas maxime debitis nam quidem cum commodi.",
    info: [
        {
            fieldName: "Name",
            fieldValue: "Hadayetullah",
        },
        {
            fieldName: "Phone",
            fieldValue: "880 1846857388",
        },
        {
            fieldName: "Experience",
            fieldValue: "01 Year",
        },
        {
            fieldName: "Nationality",
            fieldValue: "Bangladesh",
        },
        {
            fieldName: "Email",
            fieldValue: "hadayetullah30@gmail.com",
        },
        {
            fieldName: "Languages",
            fieldValue: "Bangla, English",
        },
    ]
};

// Education data
const education = {
    icon: "",
    title: "My education",
    description: 
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis non quas maxime debitis nam quidem cum commodi.", 
    types: {
        academic: [
            {
                institution: "Southeast University",
                degree: "Computer Science and Engineering (CSE)",
                year: "Passing year - 2021"
            },
            {
                institution: "Sirajganj Police Lines School and College",
                degree: "Higher Secondary Certificate (HSC)",
                year: "Passing year - 2014"
            },
        ],

        technical: [
            {
                institution: "Online Course (Bohubrihi)",
                degree: "Full Stack Web Development",
                duration: "2020 - 2021"
            },
            {
                institution: "Online Course (Bohubrihi)",
                degree: "Front-end Web Development",
                duration: "2019"
            },
            {
                institution: "MDN Web Docs and Youtube",
                degree: "Web Design",
                duration: "2018 - Present"
            },
        ]
    }
};

// Skills data
const skills = {
    title: "My skills", 
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis non quas maxime debitis nam quidem cum commodi.", 
    skillList: [
        {
            icon: <FaHtml5 />,
            name: "html 5"
        },
        {
            icon: <FaCss3 />,
            name: "css 3"
        },
        {
            icon: <FaJs />,
            name: "JavaScript"
        },
        {
            icon: <FaReact />,
            name: "React.js"
        },
        {
            icon: <SiNextdotjs />,
            name: "Next.js"
        },
        {
            icon: <SiTailwindcss />,
            name: "Tailwind css"
        },
        {
            icon: <FaNodeJs />,
            name: "Node.js"
        },
        {
            icon: <FaFigma />,
            name: "Figma"
        },
    ]
};

const Resume = (props: Props) => {
    const [activeTab, setActiveTab] = useState<TabKey>('experience');

    const tabClass = (tab: TabKey) => 
        `w-full border-[0.5px] flex items-center justify-center p-3 rounded-lg shadow-sm font-medium 
        cursor-pointer hover:border-secondarylight hover:text-secondarylight transition-colors 
        duration-300 ${
            activeTab === tab 
            && 'italic bg-secondarylight text-white hover:text-white dark:bg-transparent dark:border-[0.5px] dark:border-secondarydark dark:text-secondarydark'
        }`;
    
  return (
    <motion.div 
        id={props.id} 
        ref={props.ref} 
        className='w-full px-[12%] py-10 scroll-mt-20'
        initial={{ opacity: 0 }}
        animate={{ 
            opacity: 1, 
            transition: { delay: 2.4, duration: 0.4, ease: "easeIn"}
        }}
    >
        <motion.h4 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='text-center mb-2 text-lg font-ovo '
        >
            Personal details
        </motion.h4>

        <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='text-5xl text-center font-ovo'
        >
            My Resume
        </motion.h2>

        <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo'
        >
            Take a brief look at my background, experience, and the skills I bring to the table.
        </motion.p>

        <div className='w-full flex flex-col lg:flex-row gap-10 items-center lg:items-start'>
            <div className='w-full max-w-[380px] flex flex-col gap-3'>
                <button 
                    onClick={() => setActiveTab('experience')}
                    className={tabClass('experience')}
                >Experience</button>
                <button 
                    onClick={() => setActiveTab('education')}
                    className={tabClass('education')}
                >Education</button>
                <button 
                    onClick={() => setActiveTab('skills')}
                    className={tabClass('skills')}
                >Skills</button>
                <button 
                    onClick={() => setActiveTab('about')}
                    className={tabClass('about')}
                >About me</button>
            </div>

            <div>
                <Experience />
            </div>
        </div>
    </motion.div>
  )
}

export default Resume