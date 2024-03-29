import { FC, useState } from 'react';
import cn from 'classnames/bind';
import CheckBox from '../CheckBox';
import Label from '../Label';
import { useThemeContext } from '../../hooks/useThemeContext';
import type { Listes } from '../../comon-types';
import { ReactComponent as IconHide } from '../../assets/images/iconHide.svg';
import { ReactComponent as IconShow } from '../../assets/images/iconShow.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type MultiSelectProps = {
  selectList: Listes[];
  changeSelect: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  label: string;
};

export const MultiSelect: FC<MultiSelectProps> = ({
  selectList,
  label,
  changeSelect,
}) => {
  const [isShow, setIsShow] = useState(false);
  const { theme } = useThemeContext();

  return (
    <div className={cx('select')}>
      <label htmlFor="selectInput" className={cx('selectTite')}>
        {label}
      </label>
      <div id="selectInput" className={cx('selectInput')}>
        <div className={cx('checkedSelect')}>
          {selectList.map(({ _id, name, isChecked }) => {
            if (isChecked) {
              return (
                <Label
                  isDelAllowed={true}
                  children={name}
                  key={_id}
                  changeSelect={changeSelect}
                />
              );
            }
            return '';
          })}
        </div>
        <div className={cx('iconWrapp')} onClick={() => setIsShow(!isShow)}>
          {isShow ? (
            <IconShow
              fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
              className={cx('selectIcon')}
            />
          ) : (
            <IconHide
              fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
              className={cx('selectIcon')}
            />
          )}
        </div>
      </div>
      {isShow && (
        <ul className={cx('selectList')}>
          {selectList.map(({ _id, name, isChecked }) => (
            <li
              key={_id}
              className={cx('selectListes')}
              onClick={changeSelect}
              title={name}
            >
              <CheckBox isChecked={isChecked} />
              <p className={cx('selectListesTitle')}>{name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
