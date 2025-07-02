import React, { useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

const options = [
  { label: 'Option One', value: 'one' },
  { label: 'Option Two', value: 'two' },
  { label: 'Option Three', value: 'three' },
]

const placeholderText = 'Select an option';

type Props = {
    optionsList?: { label: string, value: string }[];
    placeholder?: string;
    fieldStyle: string;
}

const SelectField = ({optionsList = options, placeholder = placeholderText, fieldStyle}: Props) => {
    const [selected, setSelected] = useState<{label: string, value:string} | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [openAbove, setOpenAbove] = useState<boolean>(false)

    const containerRef = useRef<HTMLDivElement>(null)

    const handleSelect = (option:any) => {
        setSelected(option)
        setIsOpen(false)
        // onChange?.(option.value)
    }

  return (
    <div ref={containerRef} className="relative w-full select-none">
        <div className={fieldStyle + ' items-center justify-between cursor-pointer'}>
            <span className='text-black/60 dark:text-white/60'>{selected?.label || placeholder}</span>
            <FaChevronDown className='text-black/60 dark:text-white/60' />
        </div>

        {isOpen && (
            <div
                className={`absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ${
                    openAbove ? 'bottom-full mb-1' : 'mt-1'
                }`}
            >
                {optionsList.map((option) => (
                    <div
                        key={option.value}
                        onClick={() => handleSelect(option)}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                            selected?.value === option.value ? 'bg-gray-100 font-semibold' : ''
                        }`}
                    >
                    {option.label}
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default SelectField