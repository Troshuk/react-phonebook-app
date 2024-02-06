import { notifyApi } from 'notify';
import { useDispatch, useSelector } from 'react-redux';

import { deleteContact } from 'store/operations';
import { deleteContactSelector } from 'store/selectors';

import { FaTrash } from 'react-icons/fa';
import css from './ContactItem.module.css';
import { ContentLoader } from 'components';
import { IoIosCall, IoMdPerson } from 'react-icons/io';

export const ContactItem = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();
  const { isLoading, key } = useSelector(deleteContactSelector);

  return (
    <li className={css.contactItem}>
      <h3>
        <IoMdPerson size={20} /> {name}{' '}
      </h3>
      <span className={css.contactInfo}>
        <IoIosCall /> {number}
      </span>
      <button
        type="button"
        className={css.deleteButton}
        onClick={() =>
          notifyApi(dispatch(deleteContact(id)).unwrap(), `Removing ${name}`)
        }
        disabled={isLoading}
      >
        {key === id ? <ContentLoader /> : <FaTrash />}
      </button>
    </li>
  );
};
