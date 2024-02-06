import { useDispatch, useSelector } from 'react-redux';

import { filterSelector } from 'store/selectors';
import { setFilter } from 'store/reducers';

import css from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(filterSelector);

  const handleOnChange = ({ target: { value } }) => dispatch(setFilter(value));

  return (
    <div className={css.filter}>
      <label htmlFor="filter">Find contacts by Name or Number</label>
      <input
        type="text"
        name="filter"
        id="filter"
        value={filter}
        onChange={handleOnChange}
      />
    </div>
  );
};
