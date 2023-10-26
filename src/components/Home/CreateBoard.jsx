import React, { useState, useContext, useRef, useEffect } from 'react';
import { AUTHContext } from '../Contexts/Authorization';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import MaxLimit from '../errors/MaxLimit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

function CreateBoard({ boards, setBoards }) {
  const { apiKey, apiToken } = useContext(AUTHContext);
  const [name, setName] = useState('');
  const [open, setOpen] = React.useState(false);
  const textFieldRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };

  const handleClose = () => setOpen(false);
  const [wrongurl, setWrongurl] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://api.trello.com/1/boards/?name=${name}&key=${apiKey}&token=${apiToken}`
      )
      .then(function (response) {
        setBoards([...boards, response.data]);
        setName('');
        handleClose();
      })
      .catch(function (error) {
        setMessage(error);
        setWrongurl(true);
        console.log(error.response.data.message);
        console.log(error.response.status);
      });
  };

  if (wrongurl) {
    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box bgcolor={'black'} sx={style1}>
            <MaxLimit error={message} />;
          </Box>
        </Modal>
      </>
    );
  }

  return (
    <div>
      <Box
        style={{ cursor: 'pointer' }}
        elevation={3}
        sx={{ minWidth: 345, minHeight: 220 }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        bgcolor={'#e0e0e0'}
      >
        <Button onClick={handleOpen} variant='contained'>
          Create Board
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style} display={'flex'}>

              <label>
                <TextField
                InputProps={{autoFocus:true}}
                  id='outlined-basic'
                  label='Board Name'
                  variant='outlined'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <Button variant='contained' sx={{ margin: '2rem' }} type='submit' onClick={handleSubmit}>
                CREATE BOARD
              </Button>

          </Box>
        </Modal>
      </Box>
    </div>
  );
}

export default CreateBoard;
