import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import AddPainting from '../AddPainting';
import PaintingItem from '../PaintingItem';
import { useAppSelector } from '../../hooks/useRedux';
import { Paintings } from '../../store/types';
import Button from '../../ui/Button';
import List from '../../ui/List';
import { ReactComponent as PlusIcon } from '../../assets/images/plus.svg';
import { ReactComponent as WithoutPainterPhotoIcon } from '../../assets/images/withoutPainterPhoto.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const PainterArtWorks: FC = () => {
  const { paintings } = useAppSelector(
    ({ painterProfile: { painterProfileInfo } }) => painterProfileInfo,
  );
  const [isShowAddPhoto, setIsShowAddPhoto] = useState(false);

  return (
    <>
      <div className={cx('artWorks')}>
        <div className={cx('artWorksHeaderWrapp')}>
          <div className={cx('container')}>
            <h2 className={cx('artWorksHeader')}>Artworks</h2>
          </div>
        </div>
        <div className={cx('container')}>
          <Button
            className="linkBtn"
            handleClick={() => setIsShowAddPhoto(true)}
            title="add picture"
          >
            add picture
          </Button>
        </div>
        {paintings.length !== 0 ? (
          <List
            items={paintings}
            renderItem={(painting: Paintings) => (
              <PaintingItem painting={painting} key={painting._id} />
            )}
          />
        ) : (
          <div className={cx('withoutPaintingsWrapp')}>
            <div className={cx('container')}>
              <div className={cx('addPainting')}>
                <WithoutPainterPhotoIcon
                  fill="#DEDEDE"
                  className={cx('addPhotoIcon')}
                />
                <button
                  className={cx('addPaintingBtn')}
                  onClick={() => setIsShowAddPhoto(true)}
                >
                  <PlusIcon fill="#DEDEDE" />
                </button>
              </div>
              <h3 className={cx('withOutPainingsText')}>
                The paintings of this artist have not been uploaded yet.
              </h3>
            </div>
          </div>
        )}
      </div>

      <AddPainting
        isShowAddPhoto={isShowAddPhoto}
        setIsShowAddPhoto={() => setIsShowAddPhoto(false)}
      />
    </>
  );
};