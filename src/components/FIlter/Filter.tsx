import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames/bind';
import { Listes } from '../../comon-types';
import { modalNode } from '../../constants';
import { usePressEscape } from '../../hooks/usePressEscape';
import { useAppSelector } from '../../hooks/useRedux';
import { useSort } from '../../hooks/useSort';
import { useThemeContext } from '../../hooks/useThemeContext';
import Button from '../../ui/Button';
import { ReactComponent as IconClose } from '../../assets/images/iconClose.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type FilterProps = {
  isShowFilter: boolean;
  handleChangeShowFilter: (isShowFilter: boolean) => void;
  sortList: Listes[];
  setSortList: (sortListes: Listes[]) => void;
  genresList: Listes[];
  setGenresList: (genresList: Listes[]) => void;
  handleSubmitFilter: () => void;
  handleClearFilter: () => void;
};

export const Filter: FC<FilterProps> = ({
  isShowFilter,
  handleChangeShowFilter,
  sortList,
  setSortList,
  genresList,
  setGenresList,
  handleSubmitFilter,
  handleClearFilter,
}) => {
  const [isShowGenres, setIsShowGenres] = useState(false);
  const [isShowSortList, setIsShowSortList] = useState(false);
  const { theme } = useThemeContext();
  const { isLoading, error } = useAppSelector(({ genresState }) => genresState);

  const handleChangeChecked = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    type: string,
  ) => {
    if (type === 'sort') {
      setSortList(useSort(sortList, e, true));
    }
    if (type === 'genres') {
      setGenresList(useSort(genresList, e));
    }
  };

  useEffect(() => {
    usePressEscape(handleChangeShowFilter, isShowFilter);
  }, []);

  return createPortal(
    <div
      className={cx('filterWrapp', isShowFilter && 'showFilterWrapp')}
      onClick={() => handleChangeShowFilter(false)}
    >
      <div
        className={cx(
          'filterWrappContent',
          isShowFilter && 'showFilterWrappContent',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx('filterItemsWrapp')}>
          <div
            className={cx('headingWrapp')}
            onClick={() => setIsShowGenres(!isShowGenres)}
          >
            <h4 className={cx('filterHeading')}>Genres</h4>
            <p className={cx('showIcon')}>{!isShowGenres ? '+' : '-'}</p>
          </div>
          {!isLoading && !error && isShowGenres && (
            <ul className={cx('list')}>
              {genresList.map(({ _id, isChecked, name }) => (
                <li
                  className={cx(
                    'listes',
                    'genresListes',
                    isChecked && 'checked',
                  )}
                  key={_id}
                  title={`${name}`}
                  onClick={(e) => handleChangeChecked(e, 'genres')}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={cx('filterItemsWrapp')}>
          <div
            className={cx('headingWrapp')}
            onClick={() => setIsShowSortList(!isShowSortList)}
          >
            <h4 className={cx('filterHeading')}>Sort by</h4>
            <p className={cx('showIcon')}>{!isShowSortList ? '+' : '-'}</p>
          </div>
          {isShowSortList && (
            <ul className={cx('list', 'sortList')}>
              {sortList.map(({ _id, name, isChecked }) => (
                <li
                  className={cx('listes', isChecked && 'checked')}
                  key={_id}
                  title={`${name}`}
                  onClick={(e) => handleChangeChecked(e, 'sort')}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
          ;
        </div>
        <div className={cx('submitWrapp')}>
          <Button className="linkBtn" onClick={handleSubmitFilter}>
            show the result
          </Button>
          <Button className="linkBtn" onClick={handleClearFilter}>
            clear
          </Button>
        </div>
        <IconClose
          fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
          onClick={() => handleChangeShowFilter(false)}
          className={cx('iconClose')}
        />
      </div>
    </div>,
    modalNode,
  );
};
