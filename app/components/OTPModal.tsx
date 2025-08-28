"use client";

import clsx from 'clsx';

import { useState } from "react";
import { useRouter } from "next/navigation";
// import apiService from "@/app/actions/apiActions";
// import ErrorModal from "./ErrorModal";
// import { setCredentials } from "@/app/actions/serverActions";

interface OTPModalProps {
  OTPError: string;
  email: string;
  onClose: () => void;
  otp: string;
  setOtp: (otp: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const OTPModal: React.FC<OTPModalProps> = ({ OTPError, email, onClose, otp, setOtp, handleSubmit }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<any>(null);
  const OTPErrorStatus = OTPError.trim() != "";

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   setLoading(true);

  //   const response = await apiService.postWithoutToken(
  //     "/api/auth/verify-otp/",
  //     JSON.stringify({ email, otp })
  //   );

  //   if (response.token) {
  //     // setEmailForOtp(response.email);
  //     // console.log("response : ", response.token);
  //     await setCredentials(
  //       response.token.access_token,
  //       response.token.refresh_token,
  //       response.user
  //     );

  //     router.push("/admin");
  //     setLoading(false);
  //   } else {
  //     const tmpErrors: string[] = Object.values(response).map((error: any) => {
  //       return error;
  //     });

  //     // console.log("tmpErrors : ", tmpErrors);
  //     setApiError(tmpErrors.join(", "));
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      {/* <ErrorModal
        top="10px"
        error={apiError}
        handleError={() => setApiError(null)}
      /> */}

      <div className="fixed inset-0 flex items-center justify-center bg-[#00000099] z-[150] transition-all duration-150">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg opacity-100">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            OTP verification
            {/* { OTPErrorStatus ? OTPError : "Verify OTP"} */}
          </h2>

          {
            OTPErrorStatus ? 
            (
              <button onClick={onClose}
                className={`w-full h-[40px] flex items-center justify-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:bg-green-700 ${
                    loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`} 
                disabled={loading}
              >
                Get a new OTP
              </button>
            )
            :
            (
              <p className="text-sm text-center text-gray-600">
                An OTP has been sent to your email address. Please enter the OTP to
                verify your email address.
              </p>
            ) 
          }

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                required
                readOnly 
                disabled
                autoComplete="off" 
                className="w-full px-3 py-2 mt-1 border rounded shadow-sm bg-gray-100 outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="otp"
                // className="block text-sm font-medium text-gray-700"
                className={clsx("block text-sm font-medium", 
                  {
                    "text-red-500": OTPErrorStatus,
                    "text-gray-700": !OTPErrorStatus,
                  },
                )}
              >
                {OTPErrorStatus ? OTPError : "OTP"}
              </label>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required 
                autoComplete="off" 
                className={clsx("w-full px-3 py-2 mt-1 border rounded shadow-sm outline-none", {
                  "border-red-500": OTPErrorStatus,
                })}
              />
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className={`w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={loading}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </form>

          <div className="w-full flex items-center justify-center">
            <button
              onClick={onClose}
              disabled={loading}
              className={`w-[150px] px-4 py-2 mt-4 text-sm font-semibold text-indigo-600 bg-transparent rounded hover:bg-gray-100 ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPModal;
