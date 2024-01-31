import { notifyApi } from 'notify';
import { useDispatch, useSelector } from 'react-redux';

import { deleteContact } from 'store/operations';
import { deleteContactSelector } from 'store/selectors';

export const ContactItem = ({ contact: { id, name, phone } }) => {
  const dispatch = useDispatch();
  const { isLoading, key } = useSelector(deleteContactSelector);

  return (
    <li>
      <span>
        {name}: {phone}
      </span>
      <button
        type="button"
        onClick={() =>
          notifyApi(dispatch(deleteContact(id)).unwrap(), `Removing ${name}`)
        }
        disabled={isLoading}
      >
        {key === id ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  );
};
