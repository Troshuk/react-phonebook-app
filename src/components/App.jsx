import { Component } from 'react';
import { Section } from './Section/Section';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Storage } from 'services';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = Storage.get(Storage.CONTACTS_KEY);

    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      Storage.set(Storage.CONTACTS_KEY, contacts);
    }
  }

  handleOnChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  addContact = contact => {
    const contactAlreadyExists = this.state.contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (contactAlreadyExists) {
      alert(`${contact.name} is already in contacts`);

      return false;
    }

    this.setState({
      contacts: [
        ...this.state.contacts,
        {
          id: nanoid(),
          ...contact,
        },
      ],
    });

    return true;
  };

  removeContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase().trim())
    );

    return (
      <div>
        <Section title="Phonebook">
          <ContactForm addContact={this.addContact} />
        </Section>

        <Section title="Contacts">
          <Filter filter={filter} handleOnChange={this.handleOnChange} />
          <ContactList
            contacts={filteredContacts}
            removeContact={this.removeContact}
          />
        </Section>
      </div>
    );
  }
}
