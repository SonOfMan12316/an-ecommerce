import React, { InputHTMLAttributes, ReactNode, forwardRef, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string | ReactNode;
  placeholder?: string;
  icon?: string | ReactNode;
  placement?: 'start' | 'end';
  type?: string;
  variant?: 'serene';
  onChange?: (...args: any[]) => any;
  required?: boolean;
  extraRef?: React.Ref<HTMLInputElement>;
}

const Input: React.FC<InputProps> = forwardRef((props, ref) => {
  const {
    className,
    label,
    placeholder,
    icon = null,
    placement = 'start',
    onChange,
    type,
    variant = 'serene',
    required,
    extraRef,
    ...rest
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    return null;
  };

  return (
    <label className={classnames(className, 'flex flex-col items-start')}>
      {label && (
        <span className='text-black text-sm font-medium mb-2 flex items-center'>
          {label}
          {required ? <span>*</span> : null}
        </span>
      )}
      <div
        className={classnames('w-full h-fit relative rounded-md', {
          'bg-transparent border-[0.5px] border-ch-serene-grey/50 focus-within:ring-ch-serene-grey/30 focus-within:ring-2':
            variant === 'serene',
        })}
      >
        {icon && (
          <span
            className={classnames('absolute -translate-y-1/2 top-1/2 mt-[0.5px]', {
              'font-medium': typeof icon === 'string',
              'ml-4 left-0': placement === 'start',
              'mr-4 right-0': placement === 'end',
            })}
          >
            {icon}
          </span>
        )}
        <input
          className={classnames(
            'w-full h-10 p-2 text-black text-sm focus:outline-none outline-none placeholder:text-xs rounded-md',
            {
              '!pl-12': icon && placement === 'start',
              '!pr-12': icon && placement === 'end',
            },
          )}
          placeholder={placeholder}
          onChange={handleOnChange}
          type={type}
          autoComplete='on'
          autoCorrect='off'
          autoCapitalize='off'
          spellCheck='false'
          {...rest}
        />
      </div>
    </label>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  placeholder: PropTypes.string,
  icon: PropTypes.any,
  placement: PropTypes.oneOf(['start', 'end']),
  type: PropTypes.string,
  variant: PropTypes.oneOf(['serene']),
  onChange: PropTypes.func,
  required: PropTypes.bool,
  extraRef: PropTypes.any,
};

export default Input;
