import cn from 'classnames/bind';
import { FC } from 'react';
import { InputsProps } from '../comon-types';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const Input: FC<InputsProps> = ({ isError, id, type, className }) => (
  <>
    <input
      className={cx('input', isError && 'inputError', className)}
      placeholder={isError ? 'Wrong Text' : 'Placeholder'}
      id={id}
      type={type}
    />
    {isError && <p className={cx('errorText')}>This is an error message!</p>}
  </>
);