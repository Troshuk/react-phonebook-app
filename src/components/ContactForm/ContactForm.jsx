import css from './ContactForm.module.css';

export const ContactForm = ({ addContact }) => {
  const handleSubmit = e => {
    e.preventDefault();

    const { name, number } = e.target.elements;

    const isCreated = addContact({
      name: name.value.trim(),
      number: number.value.trim(),
    });

    if (isCreated) e.target.reset();
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
