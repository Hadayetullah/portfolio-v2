import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

// options array for the select field
const options = [
  { label: 'Frontend Development', value: 'frontend' },
  { label: 'Backend Development', value: 'backend' },
  { label: 'Full Stack Development', value: 'fullstack' },
  { label: 'General Purpose', value: 'general' },
  { label: 'Other', value: 'other' },
]

const placeholderText = 'Select an option';

// Type declaration
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

    useEffect(() => {
        if (isOpen && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            const dropdownHeight = Math.min(240, optionsList.length * 48) // approx height

            if (spaceBelow < dropdownHeight + 10) {
                setOpenAbove(true)
            } else {
                setOpenAbove(false)
            }
        }
    }, [isOpen, optionsList])

  return (
    <div ref={containerRef} className="relative w-full select-none">
        <div 
            onClick={() => setIsOpen(!isOpen)}
            className={fieldStyle + ' items-center justify-between cursor-pointer'}>
            <span className='text-black/60 dark:text-white/60'>{selected?.label || placeholder}</span>
            <FaChevronDown className={`text-black/60 dark:text-white/60 ${openAbove ? 'rotate-180' : ''}`} />
        </div>

        {isOpen && (
            <div
                className={`absolute z-10 w-full bg-white dark:bg-[#1c1c22] border border-black/20 dark:border-white/20 rounded-md shadow-lg max-h-60 overflow-auto ${
                    openAbove ? 'bottom-full mb-1' : 'mt-1'
                }`}
            >
                {optionsList.map((option) => (
                    <div
                        key={option.value}
                        onClick={() => handleSelect(option)}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#202024] dark:hover:text-secondary/70 ${
                            selected?.value === option.value ? 'bg-gray-100 dark:bg-[#202024] font-semibold italic text-secondarylight dark:text-secondary' : 'text-black/80 dark:text-white/80'
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