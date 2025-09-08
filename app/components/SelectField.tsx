import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

// Type declaration
type Props = {
    optionsList: { label: string, value: string }[];
    purposePlaceholderText: string;
    fieldStyle: string;
    handlePurposeFieldChange: (value: string) => void;
    selectedPurpose: {label: string, value:string} | null;
    setSelectedPurpose: (option: {label: string, value:string} | null) => void;
}

const SelectField = ({
    optionsList, 
    purposePlaceholderText, 
    fieldStyle, 
    handlePurposeFieldChange,
    selectedPurpose, 
    setSelectedPurpose}: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [openAbove, setOpenAbove] = useState<boolean>(false)

    const containerRef = useRef<HTMLDivElement>(null)

    const handleSelect = (option:any) => {
        setSelectedPurpose(option);
        setIsOpen(false);
        handlePurposeFieldChange(option.value);
    }

    useEffect(() => {
        // Calculate if the dropdown should open above based on available space
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
            className={fieldStyle + ' items-center justify-between cursor-pointer'}
        >
            <span className={selectedPurpose ? 'text-black dark:text-white' : 'text-black/60 dark:text-white/60'}>{selectedPurpose?.label || purposePlaceholderText}</span>
            <FaChevronDown aria-label='Toggle dropdown' className={`text-black/60 dark:text-white/60 ${openAbove ? 'rotate-180' : ''}`} />
        </div>

        {isOpen && (
            <div
                className={`absolute z-10 w-full bg-white dark:bg-[#1c1c22] border border-black/20 dark:border-white/20 rounded-md shadow-lg max-h-50 overflow-auto ${
                    openAbove ? 'bottom-full mb-1' : 'mt-1'
                }`}
            >
                {optionsList.map((option) => (
                    <div
                        key={option.value}
                        onClick={() => handleSelect(option)}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#202024] 
                            dark:hover:text-secondary/70 ${selectedPurpose?.value === option.value 
                                ? 'bg-gray-100 dark:bg-[#202024] font-semibold italic text-secondarylight dark:text-secondary' : 'text-black/80 dark:text-white/80'
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