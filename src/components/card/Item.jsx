import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import DeleteItem from './DeleteItem';
import { useContext } from 'react';
import { AUTHContext } from '../Contexts/Authorization';
import axios from 'axios';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Item({ checkItem,checklists, setChecklists }) {

  const { apiKey, apiToken } = useContext(AUTHContext);
  const handleCheckItem = (event) => {
    const checked = event.target.checked;
    const checkItemId = event.target.value;
    const cardId = checklists.find((checklist) => checklist.id === checkItem.idChecklist).idCard;

    const checkItemIndex = checklists
      .find((checklist) => checklist.id === checkItem.idChecklist)
      .checkItems.findIndex((checkItem) => checkItem.id === checkItemId);

    const checkItemState = checked ? 'complete' : 'incomplete';

    const newChecklists = [...checklists];
    newChecklists
      .find((checklist) => checklist.id === checkItem.idChecklist)
      .checkItems[checkItemIndex].state = checkItemState;

    setChecklists(newChecklists);

    axios.put(
      `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?state=${checkItemState}&key=${apiKey}&token=${apiToken}`
    ).then(function (response) {
      console.log(response.status);
    });
  }



  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px'
      }}
    >
      <FormGroup
        style={{
          width: '90%'
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              {...label}
              size='small'
              checked={checkItem.state === 'complete'}
              onChange={handleCheckItem}

              value={checkItem.id}

            />
          }
          label={checkItem.name}
          key={checkItem.id}
        />
      </FormGroup>
      <DeleteItem
        checkItem={checkItem}
        checklists={checklists}
        setChecklists={setChecklists}
      />
    </div>
  );
}

export default Item;
