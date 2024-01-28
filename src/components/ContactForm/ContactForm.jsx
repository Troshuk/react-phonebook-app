import { useDispatch, useSelector } from 'react-redux';

import { contactsSelector } from 'store/selectors';
import { createContact } from 'store/operations';

import css from './ContactForm.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelector);

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
      alert(`${contact.name} is already in contacts`);

      return;
    }

    e.target.reset();

    dispatch(createContact(contact));
  };

  return (
    <form className={css.form} autoComplete="off" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" required />
      <label htmlFor="phone">Phone number</label>
      <input type="tel" name="phone" required />
      <button>Add contact</button>
    </form>
  );
};
