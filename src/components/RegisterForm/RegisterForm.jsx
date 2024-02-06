import { NavLink } from 'react-router-dom';

import { LOGIN_ROUTE } from 'routes/routes';

import css from './RegisterForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { notifyApi } from 'notify';
import { signUp } from 'store/operations';
import { signUpSelector } from 'store/selectors';
import { FaUserPlus } from 'react-icons/fa';
import { ContentLoader } from 'components';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(signUpSelector);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    notifyApi(
      dispatch(signUp(data))
        .unwrap()
        .then(() => e.target.reset()),
      `Creating new user: ${data.name}`
    );
  };

  return (
    <div className={css.registerContainer}>
      <h1 className={css.title}>Create an Account</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          <span>Name:</span>
          <input type="text" name="name" defaultValue="Redux Guy" required />
        </label>
        <label className={css.label}>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            defaultValue="redux.guy@gmail.com"
            required
          />
        </label>
        <label className={css.label}>
          <span>Password:</span>
          <input
            type="password"
            name="password"
            defaultValue="Qwerty1"
            required
          />
        </label>
        <button type="submit" className={css.button} disabled={isLoading}>
          Create an Account &nbsp;{' '}
          {isLoading ? <ContentLoader /> : <FaUserPlus />}
        </button>
      </form>
      <div className={css.redirectLink}>
        <p>Already have an account?</p>
        <NavLink to={LOGIN_ROUTE} className={css.link}>
          Log In
        </NavLink>
      </div>
    </div>
  );
};
