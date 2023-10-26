import React from 'react';
import { AUTHContext } from '../Contexts/Authorization';
import axios from 'axios';
import { useContext, useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

function CreateList({ boardId, setLists, lists }) {
  const { apiKey, apiToken } = useContext(AUTHContext);
  const [name, setName] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://api.trello.com/1/lists/?name=${name}&idBoard=${boardId}&key=${apiKey}&token=${apiToken}`
      )
      .then(function (response) {
        setLists([...lists, response.data]);
        setName('');
        handleClose();
      });
  };
  return (
    <div>
      <Button aria-describedby={id} variant='contained' onClick={handleClick}>
        Add New List
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            m: 2,
            p: 1,
          }}
        >
          <TextField sx={{ margin: '10px' }}
          InputProps={{autoFocus:true}}

            id='outlined-basic'
            label='List Name'
            variant='outlined'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant='contained' onClick={handleSubmit}>
            CREATE LIST
          </Button>
        </Box>
      </Popover>
    </div>
  );
}

export default CreateList;
