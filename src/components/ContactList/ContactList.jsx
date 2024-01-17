import { useDispatch, useSelector } from 'react-redux';

import { getContacts, getFilter } from 'store/selectors';
import { deleteContact } from 'store/reducers';

import css from './ContactList.module.css';

export const ContactList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);

  const filteredContacts = contacts?.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase().trim())
  );

  return (
    <ul className={css.contactList}>
      {filteredContacts?.map(({ id, name, number }) => (
        <li key={id}>
          <span>
            {name}: {number}
          </span>
          <button type="button" onClick={() => dispatch(deleteContact(id))}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
