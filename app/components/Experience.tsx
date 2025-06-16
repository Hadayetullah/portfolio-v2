import React from 'react'

// Experience data
const experience = {
    icon: "",
    title: "My experience",
    description: 
        "My experience spans both frontend and backend development, allowing me to build scalable, user-friendly, and efficient web applications.", 
    items: [
        {
            company: "KaizenTech Business Development Agency",
            position: "Web Developer",
            duration: "November 2023 - June 2024"
        },
        {
            company: "D-bug Station Limited",
            position: "Junior Front-end Developer (Intern)",
            duration: "January 2023 - April 2024"
        },
        {
            company: "Self-directed learning and practicing journey",
            position: "Web development",
            duration: "2019 - Present"
        },
    ]
};

type Props = {}

const Experience = (props: Props) => {
  return (
    <div className='w-full flex flex-col gap-[30px] text-center lg:text-left'>
        <h3 className='text-4xl font-medium'>{experience.title}</h3>
        <p className='max-w-[600px] mx-auto lg:mx-0 leading-[1.5] text-black/80'>{experience.description}</p>

        <ul className='h-[410px] grid grid-cols-1 xl:grid-cols-2 gap-[30px] overflow-auto bg-gray-50 rounded-xl'>
            {experience.items.map((item, index) => (
                <li key={index} 
                    className='flex flex-col items-center justify-center sm:items-start rounded-xl bg-gray-100 
                    py-6 px-10 shadow-md gap-1'
                >
                    <span className='text-secondarylight'>{item.duration}</span>
                    <h3 className='text-xl mb-5'>{item.position}</h3>

                    <div className='flex items-center gap-3'>
                        <span className='w-[7px] h-[7px] rounded-full bg-secondarylight'></span>
                        <p className='text-black/60 text-base'>{item.company}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Experience