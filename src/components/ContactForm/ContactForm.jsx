import { Component } from 'react';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = e.target.elements;
    const { addContact } = this.props;

    const isCreated = addContact({
      name: name.value.trim(),
      number: number.value.trim(),
    });

    if (!isCreated) {
      return;
    }

    this.setState({
      name: '',
      number: '',
    });
  };

  handleOnChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form
        className={css.form}
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          id="name"
          onChange={this.handleOnChange}
          required
        />
        <label htmlFor="number">Number</label>
        <input
          type="tel"
          name="number"
          id="number"
          value={number}
          onChange={this.handleOnChange}
          required
        />
        <button>Add contact</button>
      </form>
    );
  }
}

export { ContactForm };
