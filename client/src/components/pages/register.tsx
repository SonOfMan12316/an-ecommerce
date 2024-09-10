import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { Input } from '../ui/Input';
import { convertToBase64 } from '../../utils/convertToBase64';
import { register } from '../../api/helper/helper';
import profileIcon from '../../assets/img/Profile.png';
import '../../styles/index.css';
import { registerValidation } from '../../utils/validate';

interface FormValue {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  profile?: File | string;
}

interface ResponseMessage {
  message: string;
}

// interface Username {
//   username: string;
// }

// interface CombinedValues extends FormValue {}

const Register = () => {
  const [file, setFile] = useState<string | null>();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirm_password: '',
    },

    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values: FormValue) => {
      values = { ...values, profile: file || '' };
      console.log(values);
      const registerPromise = register(values);

      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: (res) => {
          navigate('/');
          return <b>Registered Successfully</b>;
        },
        error: (err) => {
          return <b>{err.message || 'Could Not Register...!'}</b>;
        },
      });
      registerPromise.catch((err) => {
        console.log(err);
      });
    },
  });

  const onUpload = async (ele: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const uploadedImage: File | undefined = ele.target.files?.[0]; // Safely access the file
    if (uploadedImage) {
      try {
        const base64Image = await convertToBase64(uploadedImage);
        setFile(base64Image);
      } catch (error) {
        console.error('Error converting image to base64:', error);
      }
    }
  };

  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-full py-5 px-1'>
        <div className='glass'>
          <div className='title flex flex-col items-center'>
            <h4 className='text-4xl font-bold'>Register</h4>
            <span className='py-1 text-lg w-2/3 text-center text-gray-500'>Happy to join you!</span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center'>
              <label htmlFor='profile'>
                <img
                  src={file || profileIcon}
                  className='profile-img cursor-pointer'
                  alt='avatar'
                />
              </label>

              <input
                onChange={onUpload}
                accept='.jpg, .png, .jpeg'
                type='file'
                id='profile'
                name='profile'
              />
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
              <Input
                label={<span className='font-normal'>Email</span>}
                placeholder='Enter your email'
                {...formik.getFieldProps('email')}
              />
              <Input
                label={<span className='font-normal'>Username</span>}
                placeholder='Enter your username'
                {...formik.getFieldProps('username')}
              />
              <Input
                label={<span className='font-normal'>Password</span>}
                {...formik.getFieldProps('password')}
                placement='end'
                className='textbox-input'
                type='password'
                placeholder='Enter your password'
              />
              <Input
                label={<span className='font-normal'>Confirm Password</span>}
                {...formik.getFieldProps('confirm_password')}
                placement='end'
                className='textbox-input'
                type='password'
                placeholder='Confirm your password'
              />
              <button className='btn' type='submit'>
                Register
              </button>
            </div>

            <div className='text-center py-4'>
              <span>
                Already Register?{' '}
                <Link className='text-blue-500 link' to='/'>
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
