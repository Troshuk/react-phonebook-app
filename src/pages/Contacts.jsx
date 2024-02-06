import { ContactForm, Section, Filter, ContactList } from 'components';

export default function Contacts() {
  return (
    <Section title="Contacts">
      <ContactForm />
      <Filter />
      <ContactList />
    </Section>
  );
}
