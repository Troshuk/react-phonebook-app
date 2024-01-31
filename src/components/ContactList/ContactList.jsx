import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { filteredContactsSelector } from 'store/selectors';
import { fetchContacts } from 'store/operations';
import { ContactItem } from 'components';

import css from './ContactList.module.css';
import { notifyApi } from 'notify';

export const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(filteredContactsSelector);

  useEffect(() => {
    notifyApi(
      dispatch(fetchContacts()).unwrap(),
      'Retriving your contacts book'
    );
  }, [dispatch]);

  return (
    <ul className={css.contactList}>
      {filteredContacts?.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};
