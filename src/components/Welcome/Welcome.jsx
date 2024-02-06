import { NavLink } from 'react-router-dom';
import { FaBookOpen, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { SIGN_UP_ROUTE, LOGIN_ROUTE, CONTACTS_ROUTE } from 'routes/routes';
import { isLoggedInSelector } from 'store/selectors';

import css from './Welcome.module.css';

export const Welcome = () => {
  const isLoggedIn = useSelector(isLoggedInSelector);

  return (
    <div className={css.homeContainer}>
      <h1 className={css.title}>
        Welcome {isLoggedIn && 'Back'} to the Phonebook App
      </h1>
      <p className={css.description}>
        Manage your contacts easily with our simple and efficient phonebook app.
        Sign up or log in to get started.
      </p>
      <div className={css.actionButtons}>
        {isLoggedIn ? (
          <NavLink className={css.button} to={CONTACTS_ROUTE}>
            Open Phonebook <FaBookOpen size={15} />
          </NavLink>
        ) : (
          <>
            <NavLink className={css.button} to={SIGN_UP_ROUTE}>
              Register Now <FaUserPlus />
            </NavLink>
            <NavLink className={css.button} to={LOGIN_ROUTE}>
              Log In <FaSignInAlt />
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};
