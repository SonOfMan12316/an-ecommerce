import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { updateUser } from '../../api/helper/helper';
import useFetch from '../../hooks/fetch';
// import { convertToBase64 } from '../../utils/convertToBase64';
import { Input } from '../ui/Input';
import '../../styles/index.css';

interface InputValues {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
}

interface ProfileData {
  profile?: string;
}

interface CombinedValues extends InputValues, ProfileData {}

const Profile: React.FC = () => {
  const [file, setFile] = useState<string | null>(null);
  const [{ isLoading, error, status, apiData }] = useFetch<CombinedValues>('/api/userDetails');
  const navigate = useNavigate();

  const formik = useFormik<InputValues>({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || '',
    },

    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values: CombinedValues) => {
      const updatedValues = { ...values, profile: file || apiData?.profile || '' };
      // const updatePromise = updateUser(values);

      toast.promise(updateUser(updatedValues), {
        loading: 'Updating...',
        success: <b>Profile Update Successfully...!</b>,
        error: (err) => {
          setFile(null);
          return <b>{err.message || 'Couldnt Update the Profile'}</b>;
        },
      });
    },
  });

  // const onUpload = async (ele: React.ChangeEvent<HTMLInputElement>) => {
  //   const uploadedImage = ele.target.files?.[0];
  //   if (uploadedImage) {
  //     convertToBase64(uploadedImage).then((base64Image) => {
  //       if (typeof base64Image === 'string' || base64Image === null) {
  //         setFile(base64Image);
  //       }
  //     });
  //   }
  // };

  const onLogout = async () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      {isLoading ? (
        <div className='flex justify-center items-center flex-col mt-20'>
          <Toaster position='top-right' reverseOrder={false}></Toaster>
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
          <div className='flex justify-center items-start h-full py-5'>
            <div className='glass h-full profile-page'>
              <div className='title flex flex-col items-center'>
                <h4 className='text-3xl font-bold'>Profile</h4>
                <span className='py-1 text-lg w-full text-center text-gray-500'>
                  You can update the details.
                </span>
              </div>
              <form className='py-1' onSubmit={formik.handleSubmit}>
                <div className='profile flex justify-center'>
                  <label htmlFor='profile'>
                    <img
                      src={file || apiData?.profile}
                      className='profile-img w-40 cursor-pointer'
                      alt='avatar'
                    />
                  </label>

                  {/* <input onChange={onUpload} type='file' id='profile' name='profile' /> */}
                </div>

                <div className='textbox flex flex-col items-center gap-6'>
                  <div className='name flex w-3/4 gap-10'>
                    <Input
                      {...formik.getFieldProps('firstName')}
                      className='textbox-input w-3/4'
                      type='text'
                      placeholder='FirstName'
                    />
                    <Input
                      {...formik.getFieldProps('lastName')}
                      className='textbox-input w-3/4'
                      type='text'
                      placeholder='LastName'
                    />
                  </div>

                  <div className='name flex w-3/4 gap-10'>
                    <Input
                      {...formik.getFieldProps('mobile')}
                      className='textbox-input w-3/4'
                      type='text'
                      placeholder='Mobile No.'
                    />
                    <Input
                      {...formik.getFieldProps('email')}
                      className='textbox-input w-3/4'
                      type='text'
                      placeholder='Email*'
                    />
                  </div>

                  <Input
                    {...formik.getFieldProps('address')}
                    className='textbox-input w-3/4'
                    type='text'
                    placeholder='Address'
                  />
                  <button className='btn' type='submit'>
                    Update
                  </button>
                </div>
              </form>
              <div className='text-center py-4'>
                <span className='text-gray-500'>
                  Come back later?{' '}
                  <button onClick={onLogout} className='text-red-500 link'>
                    Logout
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
