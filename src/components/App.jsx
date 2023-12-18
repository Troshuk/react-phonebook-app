import { Component } from 'react';
import { Section } from './Section/Section';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addContact = contact => {
    const contactAlreadyExists = this.state.contacts.find(
      ({ name }) => name === contact.name
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
    const { contacts, filter, name, number } = this.state;

    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <Section title="Phonebook">
          <ContactForm
            name={name}
            number={number}
            handleOnChange={this.handleOnChange}
            handleSubmit={this.handleSubmit}
            addContact={this.addContact}
          />
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
