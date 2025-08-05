"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import apiService from "@/app/actions/apiActions";
// import ErrorModal from "./ErrorModal";
// import { setCredentials } from "@/app/actions/serverActions";

interface OTPModalProps {
  email: string;
  onClose: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ email, onClose }) => {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<any>(null);

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

      <div className="fixed inset-0 flex items-center justify-center bg-[#00000099] z-[150]">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg opacity-100">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Verify OTP
          </h2>

          <p className="text-sm text-center text-gray-600">
            An OTP has been sent to your email address. Please enter the OTP to
            verify your email address.
          </p>

          <form className="space-y-4">
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
                className="block text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required 
                autoComplete="off" 
                className="w-full px-3 py-2 mt-1 border rounded shadow-sm outline-none"
              />
            </div>

            <button
              // onClick={handleSubmit}
              type="submit"
              className={`w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={loading}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </form>

          <button
            onClick={onClose}
            disabled={loading}
            className={`w-full px-4 py-2 mt-4 text-sm font-semibold text-indigo-600 bg-transparent rounded hover:bg-gray-100 ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default OTPModal;
