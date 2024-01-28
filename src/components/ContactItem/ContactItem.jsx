import { useDispatch } from 'react-redux';

import { deleteContact } from 'store/operations';

export const ContactItem = ({ contact: { id, name, phone } }) => {
  const dispatch = useDispatch();
  return (
    <li>
      <span>
        {name}: {phone}
      </span>
      <button type="button" onClick={() => dispatch(deleteContact(id))}>
        Delete
      </button>
    </li>
  );
};
