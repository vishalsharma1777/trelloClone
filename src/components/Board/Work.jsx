import DeleteCard from './DeleteCard';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Card from './Card';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: '90%',
  bgcolor: '	#f3fbff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'scroll',
};

function Work({ card, cards, setCards }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div id={card.id}>
     
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
          }}

        >
          <div  style={{width:'90%',cursor:'pointer'}}onClick={handleOpen}>{card.name}</div>
          <DeleteCard id={card.id} cards={cards} setCards={setCards} />
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Card card={card}/>
          </Box>
        </Modal>
      </div>

  );
}

export default Work;
