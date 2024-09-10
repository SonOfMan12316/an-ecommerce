import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { useAuthStore } from '../../store/auth';
import { generateOTP, verifyOTP } from '../../api/helper/helper';
import { useNavigate } from 'react-router-dom';
import OtpInput, { OTPInputProps } from 'react-otp-input';
import '../../styles/index.css';

interface ExtendedOTPInputProps extends OTPInputProps {
  isInputNum?: boolean;
}

const OtpInputExtended = OtpInput as React.FC<ExtendedOTPInputProps>;

const ForgotPassword = () => {
  const { username } = useAuthStore((state) => state.auth);
  const [otp, setOtp] = useState('');
  const [otpGenerated, setOtpGenerated] = useState(false);
  const navigate = useNavigate();

  const sendOTP = () => {
    toast.promise(generateOTP(username), {
      loading: 'Sending...',
      success: <b>OTP has been sent to your email</b>,
      error: <b>Problem generating OTP...</b>,
    });
  };

  const sendFirstOTP = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!otpGenerated) {
      setOtpGenerated((otpGenerated) => !otpGenerated);
      sendOTP();
    }
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, otp });
      if (status === 201) {
        toast.success('OTP verified successfully');
        return navigate('/reset');
      }
    } catch (error) {
      return toast.error('Invalid OTP');
    }
  };

  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false} />

      <div className='flex justify-center items-center py-10'>
        <div className='card glass'>
          <div className='title flex flex-col items-center'>
            <h4 className='text-4xl font-bold'>Recovery</h4>
            <span className='py-2 text-lg w-2/3 text-center text-gray-500'>
              {otpGenerated
                ? 'Verify OTP to recover the password.'
                : 'Generate OTP and verify it to reset the password.'}
            </span>
          </div>

          <form className='pt-5'>
            <div className='textbox flex flex-col items-center justify-center gap-6'>
              <span className='py-4 text-left text-blue-700'>
                {otpGenerated
                  ? 'Enter 6 Digit OTP sent to your registered email.'
                  : 'The OTP will be sent to your registered email.'}
              </span>
              <OtpInputExtended
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props, index) => (
                  <React.Fragment key={index}>
                    <input {...props} className='otp-input' disabled={!otpGenerated} />
                    {index < 5 && <span style={{ width: '8px' }}></span>}
                  </React.Fragment>
                )}
                isInputNum={true}
                shouldAutoFocus={true}
              />
              {otpGenerated ? (
                <button className='btn' onClick={() => onSubmit}>
                  Verify OTP
                </button>
              ) : (
                <button className='btn' onClick={() => sendFirstOTP}>
                  Generate OTP
                </button>
              )}
            </div>
          </form>

          <div className='text-center py-2'>
            {otpGenerated ? (
              <span>
                Can't Get OTP?{' '}
                <button className='text-green-600 link' onClick={sendOTP}>
                  Resend
                </button>
              </span>
            ) : (
              <span className='text-red-500'>Don't refresh or leave the Page.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
