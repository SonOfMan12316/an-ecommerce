import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import useFetch from '../../hooks/fetch';
import { useAuthStore } from '../../store/auth';
import { login } from '../../api/helper/helper';
import TokenService from '../../api/token';
import { Input } from '../ui/Input';
import { Eye, EyeClose } from '../../icons';
import '../../styles/index.css';

type FormValue = {
  password: string;
};

interface ApiData {
  firstName?: string;
  username?: string;
  profile?: string;
}

const SignIn = () => {
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, error, status, apiData }] = useFetch<ApiData>(`user/${username}`);
  const [passwordType, setPasswordType] = useState('password');

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { password: '' },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ password }: FormValue) => {
      const loginPromise = login({ username, password });

      toast.promise(loginPromise, {
        loading: 'Validating Password...',
        success: <b>Login Successfully...!</b>,
        error: <b>Password do not match</b>,
      });

      const res = await loginPromise;
      const { token } = res.data;
      TokenService.setAccessToken(token);
      navigate('/profile');
    },
  });

  return isLoading ? (
    <div className='flex justify-center items-center flex-col mt-20'>
      <h1 className='text-2xl font-bold text-blue-500'>Loading...</h1>
    </div>
  ) : error ? (
    <div className='flex justify-center items-center flex-col mt-20'>
      <h1 className='text-2xl font-bold text-red-500'>Server Error</h1>
      <p>{error?.message}</p>
    </div>
  ) : (
    <div className='container mx-auto'>
      <div className='flex justify-center items-center py-10'>
        <div className='card glass'>
          <div className='title flex flex-col items-center'>
            <h4 className='text-4xl font-bold'>Hello {apiData?.firstName || apiData?.username}</h4>
            <span className='py-4 text-lg w-2/3 text-center text-gray-500'>
              Explore more by connecting with us
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} className='py1'>
            <div className='profile justify-center items-center'>
              {/* <img src={apiData?.profile || profileIcon} alt='avatar' className='profile-img' /> */}
            </div>

            <div className='textbox flex flex-col items-center justify-center gap-6'>
              <Input
                type='password'
                placeholder='password'
                {...formik.getFieldProps('password')}
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
              />
              <button className='btn' type='submit'>
                Sign In
              </button>
            </div>

            <div className='text-center py-2'>
              <span>
                Forgot Password?{' '}
                <Link to='/recovery' className='text-red-500 link'>
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
