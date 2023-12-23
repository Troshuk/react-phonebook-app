export class Storage {
  static CONTACTS_KEY = 'contacts';

  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
