import React, { useEffect, useState } from 'react'

import CountUp from 'react-countup'

type Props = {}

const stats = [
    {
        num: 1,
        text: "Year of work experience"
    },
    {
        num: 7,
        text: "Years of self-directed practice"
    },
    {
        num: 10,
        text: "Practiced projects"
    },
    {
        num: 9,
        text: "Technologies mastered"
    },
]

const Stats = (props: Props) => {
    const [zero, setZero] = useState<any>(null)
    useEffect(() => {
        let timeOut = setTimeout(() => {
            setZero(0);
        }, 3000)

        return ()=> clearTimeout(timeOut);
    }, [])
  return (
    <div className='w-full'>
        <div className='w-full mt-15 flex flex-wrap gap-8'>
            {
                stats.map((item, index) => {
                    return (
                        <div key={index} className='flex-1 flex gap-4 items-center justify-center lg:first-of-type:justify-start lg:nth-3:justify-end xl:nth-3:justify-center xl:last-of-type:justify-end'>
                            <div className='flex flex-row'>
                                <p  className='text-3xl lg:text-5xl'>
                                    {
                                        item.num.toString().length === 1 && zero
                                    }
                                </p>
                                <CountUp 
                                    end={item.num} 
                                    duration={5} 
                                    delay={2} 
                                    className='text-3xl lg:text-5xl'
                                />
                            </div>

                            <p 
                                className={`leading-[1.4] ${item.text.length < 15 ? 'w-[100px]' : 'w-[155px]'}`}
                            >{item.text}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Stats