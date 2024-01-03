import css from './ContactList.module.css';

export const ContactList = ({ contacts, removeContact }) => {
  return (
    <ul className={css.contactList}>
      {contacts?.map(({ id, name, number }) => (
        <li key={id}>
          <span>
            {name}: {number}
          </span>
          <button type="button" onClick={() => removeContact(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
