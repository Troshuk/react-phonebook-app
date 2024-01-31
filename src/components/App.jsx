import { ContactForm, Section, Filter, ContactList } from 'components';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  return (
    <div>
      <Section title="Phonebook">
        <ContactForm />
      </Section>

      <Section title="Contacts">
        <Filter />
        <ContactList />
      </Section>
      <ToastContainer />
    </div>
  );
};
