import React from 'react';
import { AUTHContext } from '../Contexts/Authorization';
import axios from 'axios';
import { useContext, useState } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

function CreateCard({ listId, setCards, cards }) {
  const { apiKey, apiToken } = useContext(AUTHContext);
  const [name, setName] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);


  };

  const nameChange = (e) => {
    let newName = e.target.value;
    setName(newName);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://api.trello.com/1/cards?idList=${listId}&key=${apiKey}&token=${apiToken}&name=${name}`
      )
      .then(function (response) {
        setCards([...cards, response.data]);
        setName('');
        handleClose();
      });
  };
  return (
    <div>
      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        m: 3,
        p: 1,
        cursor: 'pointer',
        width: '100%',
      }}
      onClick={handleClick}
    >
      Create New Work
      <IconButton color='success' size='small' aria-label='send'>
        <AddRoundedIcon />
      </IconButton>
    </div>
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
            id='card-title'
            label='Card Title'
            variant='outlined'
            type='text'
            value={name}
            onChange={nameChange}
          />
          <Button variant='contained' onClick={handleSubmit}>
            CREATE CARD
          </Button>
        </Box>
      </Popover>
    </div>
  );
}

export default CreateCard;

