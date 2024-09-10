import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { usernameValidate } from '../../utils/validate';
import { useFormik } from 'formik';
import { useAuthStore } from '../../store/auth';
import { authenticate } from '../../api/helper/helper';
import { Input } from '../ui/Input';
import '../../styles/index.css';

interface LoginInfo {
  Username: string;
}

interface ResponseMessage {
  message: string;
}

const AuthenticateUser = () => {
  const setUsername = useAuthStore((state) => state.setUsername);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { Username: '' },
    // validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values: LoginInfo) => {
      const authPromise: Promise<ResponseMessage> = authenticate(values.Username);

      toast.promise(authPromise, {
        loading: 'Fetching username...',
        success: (res) => {
          setUsername(values.Username);
          navigate('/password');
          return 'Username found.';
        },
        error: (err) => {
          navigate('/');
          return 'Username does not exists...!';
        },
      });
    },
  });

  return (
    <div className='container mx-auto'>
      <div className='flex justify-center items-center h-full p-5'>
        <div className='card glass h-full'>
          <div className='title flex flex-col items-center'>
            <h4 className='text-4xl font-bold'>Hello Again!</h4>
            <span className='py-2 text-lg w-2/3 text-center text-gray-500'>
              Explore more by connecting with us
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} className='py1'>
            <Input
              label={<span className='font-normal'>Username</span>}
              type='text'
              {...formik.getFieldProps('Username')}
              placeholder='username'
            />
            <button type='submit'>Lets Go</button>

            <div className='text-center py-2'>
              <span>
                Not a member,{' '}
                <Link to='/register' className='text-blue-500 link'>
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthenticateUser;
