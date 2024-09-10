import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { resetPassword } from '../../api/helper/helper';
import { useAuthStore } from '../../store/auth';
import useFetch from '../../hooks/fetch';
import { Input } from '../ui/Input';
import { Eye, EyeClose } from '../../icons';
import '../../styles/index.css';

interface FormValue {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { username } = useAuthStore((state) => state.auth);
  const [passwordType, setPasswordType] = useState('password');
  const [{ isLoading, error, status }] = useFetch('create-reset-session');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
  });

  const handlePassword = async ({ password }: any) => {
    const resetPromise = resetPassword({ username, password });
    toast.promise(resetPromise, {
      loading: 'Resetting the Password...',
      success: <b>Password Reset Successfully...!</b>,
      error: <b>Could not reset the password...!</b>,
    });
    resetPromise.then(() => {
      navigate('/password');
    });
  };

  if (status && status !== 201) {
    return <Navigate to={'/'} replace={true}></Navigate>;
  }

  return (
    <div>
      {isLoading ? (
        <div className='flex justify-center items-center flex-col mt-20'>
          <Toaster position='top-center' reverseOrder={false}></Toaster>
          <h1 className='text-2xl font-bold text-blue-500'>Loading...</h1>
        </div>
      ) : error ? (
        <div className='flex justify-center items-center flex-col mt-20'>
          <Toaster position='top-center' reverseOrder={false}></Toaster>
          <h1 className='text-2xl font-bold text-red-500'>Server Error</h1>
          <p>{error?.message}</p>
        </div>
      ) : (
        <div className='container mx-auto'>
          <Toaster position='top-center' reverseOrder={false}></Toaster>

          <div className='flex justify-center items-center h-screen'>
            <div className='glass' style={{ width: '50%' }}>
              <div className='title flex flex-col items-center'>
                <h4 className='text-4xl font-bold'>Reset</h4>
                <span className='py-2 text-lg w-2/3 text-center text-gray-500'>
                  Enter new password.
                </span>
              </div>

              <form className='py-20' onSubmit={() => handleSubmit(handlePassword)}>
                <div className='textbox flex flex-col items-center gap-6'>
                  <Input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password cannot be less than 8 characters',
                      },
                      validate: (value: string) => {
                        const specChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                        if (!specChar.test(value)) {
                          return 'Password must have special character.';
                        } else if (value.includes(' ')) {
                          return 'Password cannot contain white spaces';
                        }
                        return true;
                      },
                    })}
                    icon={
                      passwordType === 'text' ? (
                        <Eye
                          className='cursor-pointer'
                          onClick={() => {
                            setPasswordType('password');
                          }}
                        />
                      ) : (
                        <EyeClose
                          className='cursor-pointer'
                          onClick={() => {
                            setPasswordType('text');
                          }}
                        />
                      )
                    }
                    placement='end'
                    className='textbox-input'
                    type='password'
                    placeholder='New Password'
                  />
                  {errors.password && (
                    <span role='alert' className='text-xs text-ch-danger'>
                      {errors.password?.message}
                    </span>
                  )}
                  <Input
                    {...register('confirmPassword', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password cannot be less than 7 characters',
                      },
                      validate: (value: string) => {
                        const specChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                        if (!specChar.test(value)) {
                          return 'Password must have special character.';
                        } else if (value.includes(' ')) {
                          return 'Password cannot contain white spaces';
                        } else if (value && getValues('password') !== value) {
                          return 'Password dont match';
                        }
                        return true;
                      },
                    })}
                    icon={
                      passwordType === 'text' ? (
                        <Eye
                          className='cursor-pointer'
                          onClick={() => {
                            setPasswordType('password');
                          }}
                        />
                      ) : (
                        <EyeClose
                          className='cursor-pointer'
                          onClick={() => {
                            setPasswordType('text');
                          }}
                        />
                      )
                    }
                    placement='end'
                    className='textbox-input'
                    type='password'
                    placeholder='Confirm Password'
                  />
                  <button className='btn' type='submit'>
                    Reset
                  </button>
                  <span className='text-red-500'>Don't refresh or leave the Page.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
