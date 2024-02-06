import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { ContentLoader } from 'components';

import { contactsSelector, createContactSelector } from 'store/selectors';
import { createContact } from 'store/operations';
import { notify, notifyApi } from 'notify.js';

import css from './ContactForm.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelector);
  const { isLoading } = useSelector(createContactSelector);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => setIsCollapsed(!isCollapsed);

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
    <div className={css.contactForm}>
      <button className={css.toggleButton} onClick={handleToggleCollapse}>
        {isCollapsed ? <AiOutlinePlus /> : <AiOutlineMinus />} Add Contact
      </button>
      <div
        className={`${css.formContainer} ${isCollapsed ? css.collapsed : ''}`}
        id="contactFormCollapse"
      >
        <form className={css.form} autoComplete="off" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" required />
          <label htmlFor="number">Phone number</label>
          <input type="tel" name="number" required />
          <button disabled={isLoading}>
            {isLoading ? <ContentLoader text="Creating..." /> : 'Add contact'}
          </button>
        </form>
      </div>
    </div>
  );
};
