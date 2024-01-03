import { useState, useEffect } from 'react';
import { Section } from './Section/Section';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Storage } from 'services';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => Storage.get(Storage.CONTACTS_KEY) ?? null
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (contacts) Storage.set(Storage.CONTACTS_KEY, contacts);
  }, [contacts]);

  const handleFilterChange = ({ target: { value } }) => setFilter(value);

  const addContact = contact => {
    const contactAlreadyExists = contacts?.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (contactAlreadyExists) {
      alert(`${contact.name} is already in contacts`);

      return false;
    }

    setContacts(contacts => [
      ...(contacts ?? []),
      {
        id: nanoid(),
        ...contact,
      },
    ]);

    return true;
  };

  const removeContact = id =>
    setContacts(contacts => contacts?.filter(contact => contact.id !== id));

  const filteredContacts = contacts?.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase().trim())
  );

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm addContact={addContact} />
      </Section>

      <Section title="Contacts">
        <Filter filter={filter} handleOnChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          removeContact={removeContact}
        />
      </Section>
    </div>
  );
};
