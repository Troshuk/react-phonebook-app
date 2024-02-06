import { NavLink } from 'react-router-dom';
import {
  FaBookOpen,
  FaHome,
  FaPowerOff,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';

import css from './NavidationBar.module.css';
import {
  CONTACTS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  SIGN_UP_ROUTE,
} from 'routes/routes';
import { useDispatch, useSelector } from 'react-redux';
import { AuthReducerSelector } from 'store/selectors';
import { notifyApi } from 'notify';
import { logOut } from 'store/operations';

export const NavidationBar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(AuthReducerSelector);

  const handleLogOut = () => notifyApi(dispatch(logOut()).unwrap(), 'Sign out');

  return (
    <header className={css.header}>
      <nav className={css.list}>
        <NavLink className={css.link} to={HOME_ROUTE}>
          <FaHome size={20} />
        </NavLink>
        {isLoggedIn && (
          <NavLink className={css.link} to={CONTACTS_ROUTE}>
            <FaBookOpen size={20} />
          </NavLink>
        )}
      </nav>

      {!isLoggedIn ? (
        <nav className={css.list}>
          <NavLink className={css.link} to={SIGN_UP_ROUTE}>
            <FaUserPlus size={20} />
          </NavLink>
          <NavLink className={css.link} to={LOGIN_ROUTE}>
            <FaSignInAlt size={20} />
          </NavLink>
        </nav>
      ) : (
        <nav className={css.list}>
          <span className={css.userName}>
            <IoMdPerson size={18} /> &nbsp; {user.name}
          </span>
          <button
            type="button"
            className={`${css.logoutButton} ${css.link}`}
            onClick={handleLogOut}
          >
            <FaPowerOff size={18} />
          </button>
        </nav>
      )}
    </header>
  );
};
