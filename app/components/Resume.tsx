import React, { ForwardedRef, ReactElement, useState } from 'react'
import { motion } from 'motion/react';

import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Aboutme from './Aboutme';

type Props = {
    isDarkMode: boolean;
    id: string;
    ref: ForwardedRef<HTMLDivElement>;
}

type TabKey = 'experience' | 'education' | 'skills' | 'about';

const Resume = (props: Props) => {
    const [activeTab, setActiveTab] = useState<TabKey>('experience');

    const renderedTabContent = (): ReactElement => {
        switch (activeTab) {
            case 'experience': return <Experience />
            case 'education': return <Education />
            case 'skills': return <Skills />
            case 'about': return <Aboutme />
            default: return <div>Not found</div>
        }
    }

    const tabClass = (tab: TabKey) => 
        `w-full border-[0.5px] flex items-center justify-center p-3 rounded-lg shadow-sm font-medium 
        cursor-pointer hover:border-secondarylight dark:hover:border-secondary hover:text-secondarylight 
        dark:hover:text-secondarydark transition-colors duration-300 ${
            activeTab === tab 
            && 'italic bg-secondarylight dark:bg-transparent text-white dark:text-secondarydark hover:text-white dark:border-secondarydark'
        }`;
    
  return (
    <motion.div 
        id={props.id} 
        ref={props.ref} 
        className='w-full px-[1%] xxs:px-[12%] py-10 scroll-mt-20'
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

        <div className='w-full flex flex-col lg:flex-row gap-10 items-center justify-center lg:items-start'>
            <div className='w-full max-w-[380px] flex flex-col gap-3'>
                <h2 className='text-4xl font-medium text-black/90 dark:text-white/95'>Why hire me?</h2>
                <p className='leading-[1.5] py-3 text-black/70 dark:text-white/90 text-lg'>
                    Each tab highlights my qualifications and strengths, explore them to see why I'd 
                    be a great fit for your project.
                </p>
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
                {renderedTabContent()}
            </div>
        </div>
    </motion.div>
  )
}

export default Resume