import React, { useState } from 'react'
type Props = {}
type TabKey = 'academic' | 'technical';

// Education data
const education = {
    icon: "",
    title: "My education",
    description: 
    "My educational background reflects a strong foundation in computer science and web development. From formal academic achievements to hands-on online courses and continuous self-study, I've built a diverse skill set tailored for real-world challenges.",
    items: [
        {
            institution: "Southeast University",
            degree: "Computer Science and Engineering (CSE)",
            duration: "Passing year - 2021"
        },
        {
            institution: "Sirajganj Police Lines School and College",
            degree: "Higher Secondary Certificate (HSC)",
            duration: "Passing year - 2014"
        },
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
    ],
};

const Education = (props: Props) => {

  return (
    <div className='w-full flex flex-col gap-[30px] text-center lg:text-left'>
        <div className='w-full flex flex-col gap-3 text-black/80 dark:text-white/90'>
            <h3 className='text-2xl font-semibold'>{education.title}</h3>
            <p className='max-w-[600px] mx-auto lg:mx-0 leading-[1.5]'>{education.description}</p>
        </div>

        <ul className='h-[410px] grid grid-cols-1 xl:grid-cols-2 gap-[30px] overflow-auto'
        >
            {education.items.map((item, index) => (
                <li key={index} 
                    className='flex flex-col items-center justify-center sm:items-start rounded-xl bg-gray-100 
                    dark:bg-secondarydarklight py-6 px-10 shadow-md gap-1'
                >
                    <span className='text-primarylight dark:text-secondarydark'>{item.duration}</span>
                    <h3 className='text-xl mb-5'>{item.degree}</h3>

                    <div className='flex items-center gap-3'>
                        <span className='w-[7px] h-[7px] rounded-full bg-primarylight dark:bg-secondarydark'></span>
                        <p className='text-black/60 text-base dark:text-white/90'>{item.institution}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Education