import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";

import { ServiceModalDataType } from './Services';

type Props = {
    serviceModalData: ServiceModalDataType | null;
    handleServiceModalClose: () => void;
}

const ServiceModal = (props: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000099] text-black z-[150] transition-all duration-150">
       <div 
            className="relative w-full max-w-lg py-8 px-2 xxs:px-4 xs:px-8 space-y-4 xxs:space-y-6 bg-white rounded shadow-lg opacity-100"
        >
            <button 
                onClick={props.handleServiceModalClose} 
                aria-label='Close' 
                className='absolute top-5 right-4 w-7 xs:w-9 h-7 xs:h-9 cursor-pointer'
            >
                <MdCancelPresentation className='w-full h-full' />
            </button>
            <h2 className="text-base xxs:text-lg sm:text-xl font-bold text-left text-gray-900">
                Service of <br />{props.serviceModalData?.mainTitle}
            </h2>

            <div className='overflow-y-auto h-[250px] sm:h-[300px] md:h-fit flex flex-col gap-2 xxs:gap-4 text-sm xxs:text-base sm:text-lg leading-4 xxs:leading-5 xs:leading-6'>
                {
                    props.serviceModalData?.modalData.map((data, index) => (
                        <div key={index} className='flex flex-row items-start gap-0 xxs:gap-1'>
                            <div className='w-3 xxs:w-4 mt-1 mr-1'>
                                <FaCheckCircle className='w-3 xxs:w-4 h-3 xxs:h-4' />
                            </div> 
                            <p>
                                <span className='font-semibold'>
                                    {data.title}
                                </span>{' '} {data.description}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default ServiceModal