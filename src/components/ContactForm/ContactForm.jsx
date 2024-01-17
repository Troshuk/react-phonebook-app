import { useDispatch, useSelector } from 'react-redux';

import { getContacts } from 'store/selectors';

import css from './ContactForm.module.css';
import { createContact } from 'store/reducers';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = e => {
    e.preventDefault();

    const { name, number } = e.target.elements;

    const contact = {
      name: name.value.trim(),
      number: number.value.trim(),
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
      <label htmlFor="number">Number</label>
      <input type="tel" name="number" required />
      <button>Add contact</button>
    </form>
  );
};
