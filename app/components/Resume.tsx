import React, { ForwardedRef } from 'react'

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

type Props = {
    isDarkMode: boolean;
    id: string;
    ref: ForwardedRef<HTMLDivElement>;
}

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

// Experience data
const experience = {
    icon: "",
    title: "My experience",
    description: 
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis non quas maxime debitis nam quidem cum commodi.", 
    items: [
        {
            company: "KaizenTech Business Development Agency",
            position: "Web Developer",
            duration: "November 2023 - June 2024"
        },
        {
            company: "D-bug Station Limited",
            position: "Junior Front-end Developer (Intern)",
            duration: "November 2023 - June 2024"
        },
        {
            company: "Self-directed learning and practicing journey",
            position: "Web development",
            duration: "2019 - Present"
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
  return (
    <div 
        id={props.id} 
        ref={props.ref} 
        className='w-full px-[12%] py-10 scroll-mt-20'
    >
        Resume
    </div>
  )
}

export default Resume