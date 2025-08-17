'use client'

import React, { useEffect, useRef, useState } from 'react'
import SelectField from './SelectField';
import UserVerificationField from './UserVerificationField';
import { deleteFormCookies, getFormCookies, getProviderInfo, setAuthAndFormCookies } from '../actions/getAuthInfo';
import AuthenticatedUser from './AuthenticatedUser';
import { socialLogin, socialLogout } from '../actions/SocialAuth';
import OTPModal from './OTPModal';


type Props = {
    isDarkMode: boolean;
}

interface ProviderInfoType {
  expires?: string;
  provider?: string;
  user?: {
    email?: string | null;
    image?: string | null;
    name?: string | null;
  }
}

interface FormDataType {
    email: string;
    name: string;
    phone: string;
    purpose: string;
    message: string;
}

interface FormInputErrorsType {
    verified: string;
    email: string;
    name: string;
    purpose: string;
    message: string;
}

// options array for the select field to select verification type
const authOptionsList = [
  { label: 'User verification with social account', value: 'social' },
  { label: 'User verification with email (manually)', value: 'manual' },
];

// options array for the select field
const optionsList = [
  { label: 'Frontend Development', value: 'frontend' },
  { label: 'Backend Development', value: 'backend' },
  { label: 'Full Stack Development', value: 'fullstack' },
  { label: 'General Purpose', value: 'general' },
  { label: 'Other', value: 'other' },
]

const Form = (props: Props) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const purposePlaceholderText = 'Purpose';

    // Refs for scrolling to the first error field if there are any error fields
    const verificationRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const purposeRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);

    const [selectedAuthType, setSelectedAuthType] = useState<{label: string, value:string}>(authOptionsList[0]);

    const [selectedPurpose, setSelectedPurpose] = useState<{label: string, value:string} | null>(null)
    const [formSubmissionCount, setFormSubmissionCount] = useState<number>(0);
    const [formSubmissionSuccess, setFormSubmissionSuccess] = useState<boolean>(false);

    const [OTPStatus, setOTPStatus] = useState<boolean>(false);
    const [OTPCode, setOTPCode] = useState<string>("");
    const [OTPError, setOTPError] = useState<string>("");
    const [OTPEmail, setOTPEmail] = useState<string>("");
    const [formInputErrors, setFormInputErrors] = useState<FormInputErrorsType>({
        verified: "",
        email: "",
        name: "",
        // phone: "",
        purpose: "",
        message: "",
    });

    const [authInfo, setAuthInfo] = useState<ProviderInfoType | null>(null);
    const [formData, setFormData] = useState<FormDataType>({
        email: "",
        name: "",
        phone: "",
        purpose: "",
        message: "",
    });

    // Validate form data
    const validate = (formData: FormDataType) => {
        const errors: FormInputErrorsType = {
            verified: "",
            email: "",
            name: "",
            // phone: "",
            purpose: "",
            message: "",
        };

        if (selectedAuthType.value === 'social') {
            if (authInfo === null) {
                errors.verified = "Verification required";
            }
        };

        if (selectedAuthType.value === 'manual') {
            if (formData.email == "") {
                errors.verified = "Please provide your email address";
            } else if (!emailRegex.test(formData.email)) {
                errors.verified = "Invalid email address";
            }
        }

        if (!formData.name) {
            errors.name = "Please enter your name";
        } else if (formData.name.length < 3) {
            errors.name = "Please provide your full name";
        }

        if (!formData.purpose) {
            errors.purpose = "Please select a purpose";
        }

        if (!formData.message) {
            errors.message = "Please leave a message";
        } else if (formData.message.length <= 20) {
            errors.message = "The message must be at least 20 characters long";
        }

        // if (!formData.phone) {
        //   setFormInputErrors({...formInputErrors, phone: "Please provide your phone number"});
        // } else if (
        //   !/(^(\+88|88)?(01){1}[3456789]{1}(\d){8})$/.test(formData.phone)
        // ) {
        //   setFormInputErrors({...formInputErrors, phone: "Invalid phone number"});
        // }

        return errors;
    };
    
    // Fetch authentication information when the component mounts
    useEffect(() => {
        const authInfoPromise = getProviderInfo();
        authInfoPromise.then((credentials) => {
            console.log("Credentials : ", credentials);
            if (credentials?.user) {
                setAuthInfo(credentials);
            } else {
                setAuthInfo(null);
            }
        })

        const formValues = getFormCookies();
        formValues.then((result) => {
            if (result) {
              setFormData(result);  
            } 
        })

        deleteFormCookies();
    }, [])

    // Validate form data when formData or formSubmissionCount changes
    useEffect(() => {
        if (formSubmissionCount > 0) {
            if (!formSubmissionSuccess) {
                const errors = validate(formData);
                setFormInputErrors(errors);
            }
        }
    }, [formSubmissionSuccess, formData, formSubmissionCount]);

    // Handle form data change
    const handleChange = (e: any) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handlePurposeFieldChange = (value: string) => {
        setFormData({
            ...formData,
            purpose: value,
        })
    }

    // Handle social login
    const handleSocialLogin = async(e: React.FormEvent, provider: string) => {
        e.preventDefault();
        await setAuthAndFormCookies(formData);
        await socialLogin(provider);
    }

    // Logout from social account
    const handleLogout = async(e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAuthInfo(null);
        await socialLogout();
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validate(formData);
        setFormInputErrors(errors);
        setFormSubmissionCount(1);

        const hasErrors = Object.values(errors).some((err) => err.trim() !== "");

        if (hasErrors) {
            // Scroll to the first error field
            if (errors.verified && verificationRef.current) {
                verificationRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (errors.name && nameRef.current) {
                nameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (errors.purpose && purposeRef.current) {
                purposeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (errors.message && messageRef.current) {
                messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            return; // prevent submission
        }

        // If no errors, proceed to submit
        // formData.providerData = authInfo;
        console.log("Submit formData:", formData);
        const res = await fetch("/api/form/manual", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({providerType: selectedAuthType.value, formData: formData}),
        });

        const result = await res.json();
        console.log("Submission result : ", result)
        if (result.success) {
            const successData = result.data;
            if (!successData.verified || !successData.active) {
                setOTPEmail(successData.email);
                setOTPStatus(true);
            }
        }
        // console.log("Submission result : ", result)

        setFormSubmissionCount(0);
        setSelectedPurpose(null);
        setFormData({
            email: "",
            name: "",
            phone: "",
            purpose: "",
            message: "",
        });
    };




    // Social icons
    const googleIcon = <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0 1 16.42 6.5L19.9 3A11.97 11.97 0 0 0 1.24 6.65l4.03 3.11Z"/><path fill="#34A853" d="M16.04 18.01A7.4 7.4 0 0 1 12 19.1a7.08 7.08 0 0 1-6.72-4.82l-4.04 3.06A11.96 11.96 0 0 0 12 24a11.4 11.4 0 0 0 7.83-3l-3.79-2.99Z"/><path fill="#4A90E2" d="M19.83 21c2.2-2.05 3.62-5.1 3.62-9 0-.7-.1-1.47-.27-2.18H12v4.63h6.44a5.4 5.4 0 0 1-2.4 3.56l3.8 2.99Z"/><path fill="#FBBC05" d="M5.28 14.27a7.12 7.12 0 0 1-.01-4.5L1.24 6.64A11.93 11.93 0 0 0 0 12c0 1.92.44 3.73 1.24 5.33l4.04-3.06Z"/></svg>
    const facebookIcon = <svg className='w-full h-full' xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256"><path fill="#1877F2" d="M256 128a128 128 0 1 0-148 126.4V165H75.5v-37H108V99.8c0-32 19.1-49.8 48.3-49.8 14 0 28.7 2.5 28.7 2.5V84h-16.1c-16 0-20.9 9.9-20.9 20v24h35.5l-5.7 37H148v89.4A128 128 0 0 0 256 128"/><path fill="#FFFFFF" d="m177.8 165 5.7-37H148v-24c0-10.1 5-20 20.9-20H185V52.5S170.4 50 156.3 50C127.1 50 108 67.7 108 99.8V128H75.5v37H108v89.4a129 129 0 0 0 40 0V165h29.8"/></svg>
    const githubIcon = <svg className='w-full h-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill={`${props.isDarkMode ? '#ffffff' : ''}`} d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3"/></svg>
    
    // Provider information array
    const providerInfo = [
        {
            icon: googleIcon,
            provider: 'google',
            title: 'Sign in with Google',
            title2: 'Google account'
        },
        {
            icon: facebookIcon,
            provider: 'facebook',
            title: 'Sign in with Facebook',
            title2: 'Facebook account'
        },
        {
            icon: githubIcon,
            provider: 'github',
            title: 'Sign in with GitHub',
            title2: 'GitHub account'
        },
    ];

    const inputStyle = `flex h-[35px] xxs:h-[42px] xs:h-[48px] border-[0.5px] border-black/20 
        dark:border-white/20 px-1 xxs:px-4 py-2 xxs:py-5 text-base text-black dark:text-white 
        placeholder:text-black/60 dark:placeholder:text-white/60 outline-none bg-white dark:bg-[#1c1c22] 
        rounded-md placeholder:text-sm xxs:placeholder:text-base shadow-sm`;

    const textAreaStyle = `flex border-[0.5px] border-black/20 dark:border-white/20 px-1 xxs:px-4 py-2 xxs:py-5 text-base text-black 
        dark:text-white placeholder:text-black/60 dark:placeholder:text-white/60 outline-none bg-white 
        dark:bg-[#1c1c22] rounded-md placeholder:text-sm xxs:placeholder:text-base`;

    const UserVerificationFieldStyle = `h-auto sm:h-[48px] border-[0.5px] border-black/20 
        dark:border-white/20 text-base text-black dark:text-white outline-none bg-white dark:bg-[#1c1c22] 
        rounded-md shadow-sm`

  return (
    <>
        <form onSubmit={(e) => handleSubmit(e)} className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 xxs:gap-x-6'>
            {/* User Verification Field */}
            <div ref={verificationRef} className='col-span-1 sm:col-span-2 flex flex-col'>
                {
                selectedAuthType.value === 'manual' && formSubmissionCount < 1 
                    ? 
                    <span 
                        className='h-6 w-full leading-[1] text-[10px] xxs:text-sm flex items-end text-orange-700'>
                            An OTP will be sent to your email address.
                    </span>
                    :
                    <span 
                        className='h-6 w-full leading-[1] text-[10px] xxs:text-sm flex items-end text-red-600'>
                            {formInputErrors.verified && formInputErrors.verified}
                    </span>
                }

                {
                    authInfo?.provider
                    ?
                    <AuthenticatedUser 
                        handleLogout={handleLogout} 
                        UserVerificationFieldStyle={UserVerificationFieldStyle} 
                        providerInfo={providerInfo} 
                        authInfo={authInfo} 
                    />
                    :
                    <UserVerificationField 
                        authOptionsList={authOptionsList} 
                        UserVerificationFieldStyle={UserVerificationFieldStyle} 
                        providerInfo={providerInfo} 
                        handleSocialLogin={handleSocialLogin} 
                        emailValue={formData.email} 
                        handleChange={handleChange}
                        selectedAuthType={selectedAuthType} 
                        setSelectedAuthType={setSelectedAuthType}
                    />
                }
            </div>

            <div ref={nameRef} className='flex flex-col'>
                <span 
                    className='h-6 w-full leading-[1] text-[10px] xxs:text-sm flex items-end text-red-600'
                >
                    {formInputErrors.name && formInputErrors.name}
                </span>
                <input 
                    type='text' 
                    name='name' 
                    placeholder='Your name' 
                    value={formData.name} 
                    onChange={(e) => handleChange(e)} 
                    autoComplete="off"
                    className={inputStyle}
                />
            </div>
            {/* <input 
                type='text' 
                name='lastname' 
                placeholder='Last name'
                className={inputStyle}
            /> */}
            {/* <input 
                type='email' 
                name='email' 
                placeholder='Email address'
                className={inputStyle}
            /> */}

            <div className='flex flex-col'>
                <span 
                    className='h-6 w-full leading-[1] text-[10px] xxs:text-sm flex items-end text-red-600'>
                        {/* {formInputErrors.phone && formInputErrors.phone} */}
                </span>
                <input 
                    type='text' 
                    name='phone' 
                    placeholder='Phone number (optional)'
                    value={formData.phone}
                    onChange={(e) => handleChange(e)} 
                    autoComplete="off"
                    className={inputStyle}
                />
            </div>

            {/* Custom SelectField component */}
            <div ref={purposeRef} className='col-span-1 sm:col-span-2 flex flex-col'>
                <span 
                    className='h-6 w-full leading-[1] text-[10px] xxs:text-sm flex items-end text-red-600'
                >
                    {formInputErrors.purpose && formInputErrors.purpose}
                </span>
                <SelectField 
                    optionsList={optionsList} 
                    purposePlaceholderText={purposePlaceholderText} 
                    fieldStyle={inputStyle} 
                    handlePurposeFieldChange={handlePurposeFieldChange} 
                    selectedPurpose={selectedPurpose} 
                    setSelectedPurpose={setSelectedPurpose}
                />
            </div>

            <div ref={messageRef} className='col-span-1 sm:col-span-2 flex flex-col'>
                <span 
                    className='h-6 w-full leading-[1] text-[10px] xxs:text-sm flex items-end text-red-600'
                >
                    {formInputErrors.message && formInputErrors.message}
                </span>
                <textarea 
                    name='message' 
                    placeholder='Type your message here...'
                    value={formData.message}
                    onChange={(e) => handleChange(e)} 
                    autoComplete="off"
                    className={`${textAreaStyle} h-[140px] xxs:h-[160px] resize-none`}
                />
            </div>

            <div className='flex flex-col'>
                <span className='h-6 w-full leading-[1] text-[10px] xxs:text-sm flex items-end text-red-600'></span>
                <button 
                    type='submit' 
                    onClick={(e) => handleSubmit(e)} 
                    className='max-w-40 border border-black/30 text-black/85 cursor-pointer rounded py-1 
                    dark:border-secondary/50 dark:text-secondary/95 text-lg font-medium'
                >
                    Send Message
                </button>
            </div>
        </form>

        {
            OTPStatus && <OTPModal OTPError={OTPError} email={OTPEmail} onClose={() => setOTPStatus(false)} />
        }
    </>
  )
}

export default Form;