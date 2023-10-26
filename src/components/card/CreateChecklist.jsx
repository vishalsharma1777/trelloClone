import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import { AUTHContext } from '../Contexts/Authorization';
import axios from 'axios';

function CreateChecklist({cardId, setChecklists, checklists}) {
  const { apiKey, apiToken } = useContext(AUTHContext);
  const [checklist, setChecklist] = useState([]);

  const handleNameChange = (event) => {
    let name = event.target.value;
    setChecklist(name);
  };

    const handleCreateChecklist = () => {
    axios
      .post(
        `https://api.trello.com/1/checklists?idCard=${cardId}&name=${checklist}&key=${apiKey}&token=${apiToken}`
      )
      .then(function (response) {
        setChecklist('');
        setChecklists([...checklists, response.data]);
      });
    }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid black',
        padding: '10px',
        borderRadius: '5px',
        margin: '10px',
        backgroundColor: '#e4f1f8',
      }}
    >
      <TextField
      InputProps={{autoFocus:true}}
        id='outlined-basic'
        label='Create Checklist'
        variant='filled'
        size='small'
        color='success'
        value={checklist}
        onChange={handleNameChange}
      />
      <Button variant='contained' color='success' type='submit' onClick={handleCreateChecklist}>Create</Button>
    </div>
  );
}

export default CreateChecklist;
