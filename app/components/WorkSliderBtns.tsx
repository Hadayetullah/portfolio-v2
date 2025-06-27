import React from 'react'
import {PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi"
import { useSwiper } from 'swiper/react';

type Props = {}

const WorkSliderBtns = (props: Props) => {
    const swiper = useSwiper();
    console.log(swiper)

    const btnsStyle = `text-[22px] bg-primarylight dark:bg-transparent dark:border border-secondary 
    rounded w-[44px] h-[44px] justify-center items-center flex transition-all duration-300`;

  return (
    <div 
        className='absolute right-0 bottom-[calc(50%_-_22px)] lg:bottom-0 flex gap-2 
        z-20 w-full lg:w-auto justify-between lg:justify-normal'
    >
        <button 
            className={`${btnsStyle} ${swiper.isBeginning ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => swiper.slidePrev()}
        >
            <PiCaretLeftBold className={`text-black dark:text-secondary ${swiper.isBeginning ? 'text-black/70 dark:text-secondary/70' : ''}`} />
        </button>

        <button 
            className={`${btnsStyle} ${swiper.isEnd ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => swiper.slideNext()}
        >
            <PiCaretRightBold className={`text-black dark:text-secondary ${swiper.isEnd ? 'text-black/70 dark:text-secondary/70' : ''}`} />
        </button>
    </div>
  )
}

export default WorkSliderBtns