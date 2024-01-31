import { useDispatch, useSelector } from 'react-redux';

import { contactsSelector, createContactSelector } from 'store/selectors';
import { createContact } from 'store/operations';

import css from './ContactForm.module.css';
import { notify, notifyApi } from 'notify.js';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelector);
  const { isLoading } = useSelector(createContactSelector);

  const handleSubmit = e => {
    e.preventDefault();

    const { name, phone } = e.target.elements;

    const contact = {
      name: name.value.trim(),
      phone: phone.value.trim(),
    };

    const contactAlreadyExists = contacts?.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (contactAlreadyExists) {
      notify(`${contact.name} is already in contacts`, 'error');

      return;
    }

    notifyApi(
      dispatch(createContact(contact))
        .unwrap()
        .then(() => e.target.reset()),
      `Creating ${contact.name}`
    );
  };

  return (
    <form className={css.form} autoComplete="off" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" required />
      <label htmlFor="phone">Phone number</label>
      <input type="tel" name="phone" required />
      <button disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Add contact'}
      </button>
    </form>
  );
};
