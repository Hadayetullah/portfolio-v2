import React from 'react'

type Props = {}

// About data
const about = {
    title: "About me",
    description: 
    "I'm a passionate web developer with a proven ability to craft engaging digital experiences. My background spans both front-end and back-end technologies, allowing me to contribute efficiently across the full web development lifecycle.",
    info1: [
        {
            fieldName: "Name",
            fieldValue: "Hadayetullah",
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
            fieldName: "Freelance",
            fieldValue: "Available",
        },
    ],
    info2: [
        {
            fieldName: "Phone",
            fieldValue: "880 1846857388",
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

const Aboutme = (props: Props) => {
  return (
    <div className='w-full flex flex-col gap-[30px] text-center lg:text-left'>
        <div className='w-full flex flex-col gap-3 text-black/80 dark:text-white/90'>
            <h3 className='text-2xl font-semibold'>{about.title}</h3>
            <p className='max-w-[600px] mx-auto lg:mx-0 text-sm xxs:text-base leading-[1.5]'>{about.description}</p>
        </div>

        <div className='w-full grid grid-cols-1 xl:grid-cols-[280px_280px] gap-2 xl:gap-[20px] overflow-auto rounded-xl'>
            <ul className='p-0 mx-auto sm:mx-0 flex flex-col gap-1 lg:gap-2'>
                {
                    about.info1.map((item, index) => (
                        <li 
                            key={index} 
                            className='flex flex-row gap-4 justify-start xs:justify-center lg:justify-start mx-1 xs:mx-0'
                        >
                            <span className='text-black/70 dark:text-white/70'>{item.fieldName}</span>
                            <span className='text-lg font-medium text-black/75 dark:text-white/80'>{item.fieldValue}</span>
                        </li>
                    ))
                }
            </ul>

            <ul className='p-0 mx-auto sm:mx-0 flex flex-col gap-1 lg:gap-2'>
                {
                    about.info2.map((item, index) => (
                        <li 
                            key={index} 
                            className='flex flex-row gap-4 justify-start xs:justify-center lg:justify-start mx-1 xs:mx-0'
                        >
                            <span className='text-black/70 dark:text-white/70'>{item.fieldName}</span>
                            <span className='text-lg font-medium text-black/75 dark:text-white/80'>{item.fieldValue}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default Aboutme