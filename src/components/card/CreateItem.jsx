import React from 'react';
import { useContext, useState } from 'react';
import { AUTHContext } from '../Contexts/Authorization';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function CreateItem({ checklistId, checklists, setChecklists }) {
  const { apiKey, apiToken } = useContext(AUTHContext);
  const [item, setItem] = useState([]);
  const handleNameChange = (event) => {
    let name = event.target.value;
    setItem(name);
  };

  const eventChecklist = checklists.filter(
    (checklist) => checklist.id === checklistId
  );

  const handleCreateItem = () => {
    axios
      .post(
        `https://api.trello.com/1/checklists/${checklistId}/checkItems?name=${item}&key=${apiKey}&token=${apiToken}`
      )
      .then(function (response) {
        setItem('');
        eventChecklist[0].checkItems.push(response.data);
        let index = checklists.findIndex(
          (checklist) => checklist.id === checklistId
        );
        checklists[index] = eventChecklist[0];
        setChecklists([...checklists]);
      });
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid black',
        padding: '10px',
        borderRadius: '5px',
        margin: '10px',
        backgroundColor: '#d0dcea'
      }}
    >
      <TextField
        id='outlined-basic'
        label='Create Item'
        variant='filled'
        value={item}
        size='small'
        fontSize='10px'
        onChange={handleNameChange}
      />
      <Button variant='contained' type='submit' onClick={handleCreateItem}>
        Create
      </Button>
    </div>
  );
}

export default CreateItem;
