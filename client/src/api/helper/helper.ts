import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import TokenService from '../token';

interface ResponseMessage {
  err?: string;
  message?: string;
  data?: any;
  e?: any;
}

interface AuthResponseMessage {
  message: string;
}

interface LoginResponse {
  data: any;
}

interface User {
  username?: string;
  email?: string;
}

interface GetUserError {
  error: string;
  e: any;
}

interface OTPResponse {
  OTP: string;
}

interface Credentials {
  email?: string;
  username?: string;
  password?: string;
  otp?: string;
  newPassword?: string;
}

interface MailData {
  username: string;
  userEmail: string;
  subject: string;
  mailType: string;
  otp?: string;
}

interface verificationResponse {
  data: any;
  status: number;
}

export const getUsername = async (): Promise<Record<string, unknown>> => {
  const token = TokenService.getAccessToken() ? TokenService.getAccessToken() : null;

  if (!token) {
    return Promise.reject('Cannot find token...!');
  }

  const decodedToken: Record<string, never> = jwtDecode(token);
  return decodedToken;
};

export const authenticate = async (username: string): Promise<AuthResponseMessage> => {
  try {
    const { status } = await axios.post('/api/authenticate', { username });

    if (status !== 200) {
      throw new Error('Username not Found');
    }
    return Promise.resolve({ message: 'Username found successfully.' });
  } catch (error: any) {
    return Promise.reject({ message: error?.response?.data?.message || 'An expected error' });
  }
};

export const register = async (credentials: Credentials): Promise<ResponseMessage> => {
  try {
    const { status } = await axios.post('/api/register', credentials);

    if (status === 201) {
      const message = 'Registered Successfully!';
      const mailData = {
        username: credentials.username,
        userEmail: credentials.email,
        subject: message,
        mailType: 'registerMail',
      };
      await axios.post('/api/send-mail', mailData);
      return Promise.resolve({ message });
    } else {
      throw new Error('Registration Failed...!');
    }
  } catch (err: any) {
    const message = err?.response?.data?.error;
    return Promise.reject({ err, message });
  }
};

export const login = async (credentials: Credentials): Promise<LoginResponse> => {
  try {
    const { data } = await axios.post('/api/login', credentials);
    return Promise.resolve({ data });
  } catch (e) {
    return Promise.reject({ error: 'Login Failed...!', e });
  }
};

export const getUser = async ({ username }: { username: string }): Promise<User | GetUserError> => {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return data;
  } catch (e: any) {
    return { error: 'Couldnt fetch the user data', e };
  }
};

export const updateUser = async (credentials: Credentials): Promise<ResponseMessage> => {
  try {
    const token = TokenService.getAccessToken() ? TokenService.getAccessToken() : null;

    if (!token) {
      throw new Error('No token found');
    }

    const { data }: { data: any } = await axios.put('api/update-user', credentials, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (err: any) {
    const message = err?.response?.data?.error || 'Update failed';
    return Promise.reject({ err, message });
  }
};

export const generateOTP = async (username: string): Promise<string | ResponseMessage> => {
  try {
    const { data, status }: { data: OTPResponse; status: number } = await axios.get(
      '/api/generate-otp',
      { params: { username } },
    );

    if (status === 201) {
      const { email } = (await getUser({ username })) as { email: string };
      const mailData: MailData = {
        username: username,
        userEmail: email,
        subject: 'Password Recovery OTP',
        mailType: 'otpMail',
        otp: data?.OTP,
      };
      await axios.post('/api/send-mail', mailData);
    }

    return Promise.resolve(data?.OTP);
  } catch (e) {
    return Promise.reject({ error: 'Couldnt generate OTP...!', e });
  }
};

export const verifyOTP = async (credentials: Credentials): Promise<verificationResponse> => {
  try {
    const { data, status }: verificationResponse = await axios.get('/api/verify-otp', {
      params: credentials,
    });
    return { data, status };
  } catch (e: any) {
    return Promise.reject({ error: 'OTP Verification Failed...!', e });
  }
};

export const resetPassword = async (credentials: Credentials): Promise<verificationResponse> => {
  try {
    const { data, status }: verificationResponse = await axios.put(
      '/api/reset-password',
      credentials,
    );
    return Promise.resolve({ data, status });
  } catch (e: any) {
    return Promise.reject({ error: 'Password reset failed...!', e });
  }
};
