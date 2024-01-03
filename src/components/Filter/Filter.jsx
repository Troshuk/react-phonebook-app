import css from './Filter.module.css';

export const Filter = ({ filter, handleOnChange }) => {
  return (
    <div className={css.filter}>
      <label htmlFor="filter">Find contacts by name</label>
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
