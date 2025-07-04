import React from 'react'
import {PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi"
import { useSwiper } from 'swiper/react';

type Props = {}

const WorkSliderBtns = (props: Props) => {
    const swiper = useSwiper();

    const btnsStyle = `text-[18px] xxs:text-[22px] xs:text-[28px] rounded w-[30px] xxs:w-[38px] xs:w-[44px] h-[30px] xxs:h-[38px] xs:h-[44px] justify-center items-center flex transition-all duration-300`;

  return (
    <div 
        className='absolute right-0 bottom-[calc(50%_-_22px)] lg:bottom-0 flex gap-2 
        z-20 w-full lg:w-auto justify-between lg:justify-normal'
    >
        <button 
            aria-label='Previous Slide'
            className={`${btnsStyle} ${swiper.isBeginning ? 
                'bg-[#990f48] dark:bg-[#59b544] cursor-not-allowed' : 
                'bg-primarylight dark:bg-secondary cursor-pointer'}`
            }
            onClick={() => swiper.slidePrev()}
        >
            <PiCaretLeftBold className={`text-white`} />
        </button>

        <button 
            aria-label='Next Slide'
            className={`${btnsStyle} ${swiper.isEnd ? 
                'bg-[#990f48] dark:bg-[#59b544] cursor-not-allowed' : 
                'bg-primarylight dark:bg-secondary cursor-pointer'}`
            }
            onClick={() => swiper.slideNext()}
        >
            <PiCaretRightBold className={`text-white`} />
        </button>
    </div>
  )
}

export default WorkSliderBtns