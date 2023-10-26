import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { AUTHContext } from '../Contexts/Authorization';
import { useContext } from 'react';
function DeleteChecklist({ checklistId, checklists, setChecklists }) {

    const { apiKey, apiToken } = useContext(AUTHContext);
    const deleteCard = () => {
        axios
          .delete(
            `https://api.trello.com/1/checklists/${checklistId}?key=${apiKey}&token=${apiToken}`
          )
          .then(function (response) {
            setChecklists(checklists.filter((item) => item.id !== checklistId));
          });
      }
      
  return (
    <IconButton aria-label='delete' onClick={deleteCard}>
      <DeleteIcon color='error' />
    </IconButton>
  );
}

export default DeleteChecklist;
