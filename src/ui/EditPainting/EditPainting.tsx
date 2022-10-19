import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames/bind';
import Button from '../Button';
import Input from '../Input';
import { SetIsShow } from '../../comon-types';
import DragAndDrop from '../../components/DragAndDrop';
import { modalNode } from '../../constants';
import { usePressEscape } from '../../hooks/usePressEscape';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useUnScroll } from '../../hooks/useUnScroll';
import { useValidation } from '../../hooks/useValidation';
import { ReactComponent as CloseIcon } from '../../assets/images/closeIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/deleteIcon.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type EditPaintingProps = {
  isShowEditPainting: boolean;
  setIsShowEditPaintings: SetIsShow;
};

export const EditPainting: FC<EditPaintingProps> = ({
  isShowEditPainting,
  setIsShowEditPaintings,
}) => {
  const { theme } = useThemeContext();
  const [image, setImage] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [isErrorName, setIsErrorName] = useState(true);
  const [isErrorYear, setIsErrorYear] = useState(true);
  const [nameErrorMessage, setNameMessage] = useState('');
  const [yearErrorMessage, setYearMessage] = useState('');

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    usePressEscape(setIsShowEditPaintings, isShowEditPainting);
    useUnScroll(isShowEditPainting);
    useValidation('name', name, setIsErrorName, setNameMessage);
    useValidation('year', year, setIsErrorYear, setYearMessage);
  }, [name, year, image, isShowEditPainting]);

  return createPortal(
    <>
      {isShowEditPainting && (
        <div
          className={cx('editPaintingWrapp')}
          onClick={() => setIsShowEditPaintings(false)}
        >
          <form
            className={cx('editPaintingWrappContent')}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handelSubmit}
          >
            <div className={cx('inputsWrapp')}>
              <Input
                label="The name of the picture"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isError={isErrorName}
                errorMessage={nameErrorMessage}
              />
              <Input
                label="Year of creation"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                isError={isErrorYear}
                errorMessage={yearErrorMessage}
              />
            </div>
            {!image ? (
              <DragAndDrop
                setImage={setImage}
                image={image}
                setPreviewUrl={setPreviewUrl}
                previewUrl={previewUrl}
              />
            ) : (
              <div className={cx('previewImageWrapp')}>
                <img
                  src={previewUrl}
                  alt="preview"
                  className={cx('previewImage')}
                />
                <DeleteIcon
                  width="16px"
                  height="16px"
                  fill="#DEDEDE"
                  className={cx('deleteIcon')}
                  onClick={() => setImage(undefined)}
                />
              </div>
            )}
            <Button
              className="defaultBtn"
              disabled={isErrorName || isErrorName || !image}
            >
              Save
            </Button>
            <CloseIcon
              className={cx('closeIcon')}
              fill={theme === 'dark' ? '#9C9C9C' : '#575757'}
              onClick={() => setIsShowEditPaintings(false)}
            />
          </form>
        </div>
      )}
    </>,
    modalNode,
  );
};