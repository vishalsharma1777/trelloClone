import { AUTHContext } from '../Contexts/Authorization';
import { useContext } from 'react';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';


function DeleteItem({checkItem, checklists, setChecklists}) {
    const { apiKey, apiToken } = useContext(AUTHContext);
    const deleteItem = () => {
        axios
          .delete(
            `https://api.trello.com/1/checklists/${checkItem.idChecklist}/checkItems/${checkItem.id}?key=${apiKey}&token=${apiToken}`
          )
          .then(function (response) {
            const checkItems = checklists.find((item) => item.id === checkItem.idChecklist).checkItems;
            const newChecklists = checklists.map((item) => {
                if (item.id === checkItem.idChecklist) {
                    return {
                        ...item,
                        checkItems: checkItems.filter((item) => item.id !== checkItem.id)
                    }
                }
                return item;
            });
            setChecklists(newChecklists);

          });
      }
    return (
        <IconButton aria-label='delete' size='small' color='error' onClick={deleteItem}>
        <ClearIcon />
      </IconButton>
    );
}

export default DeleteItem;