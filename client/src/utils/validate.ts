import toast from 'react-hot-toast';

interface ErrorObject {
  username?: string | null;
  email?: string | null;
  password?: string | null;
}

interface Values {
  username?: string | null;
  email?: string;
  password?: string | null;
  confirm_password?: string | null;
}

function toastWarn(message: string) {
  return toast(message, {
    icon: '⚠️',
    duration: 6000,
  });
}

function usernameVerify(error: ErrorObject = {}, values: Values) {
  const validRegex = /^[A-Za-z0-9_]+$/;

  if (!values.username) {
    error.username = toast.error('Username is required...!');
  } else if (!validRegex.test(values.username)) {
    toastWarn('Only alphanumeric characters and underscores are allowed in username');
    error.username = toast.error('Invalid Username...!');
  }
  return error;
}

function passwordVerify(errors: ErrorObject = {}, values: Values, confirm = false): ErrorObject {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error('Password is Required...!');
  } else if (values.password.includes(' ')) {
    errors.password = toast.error('Password cannot contain white spaces.');
  } else if (values.password.length < 8) {
    errors.password = toast.error('Password must be more than 8 characters long.');
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error('Password must have special character.');
  } else if (confirm && values.password !== values.confirm_password) {
    errors.password = toast.error('Password not match...!');
  }

  return errors;
}

function emailVerify(error: ErrorObject = {}, values: Values): ErrorObject {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!values.email) {
    error.email = toast.error('Email is Required...!');
  } else if (values.email.includes(' ') || !emailRegex.test(values.email)) {
    error.email = toast.error('Invalid Email...!');
  }
  return error;
}

export const usernameValidate = (values: Values) => {
  const errors = usernameVerify({}, values);
  return errors;
};

export async function passwordValidate(values: Values) {
  const errors = passwordVerify({}, values);
  return errors;
}

export async function resetPasswordValidation(values: Values) {
  const errors = passwordVerify({}, values, true);
  return errors;
}

export async function registerValidation(values: Values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values, true);
  emailVerify(errors, values);
  return errors;
}

export async function profileValidation(values: Values) {
  const errors = emailVerify({}, values);
  return errors;
}
