import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List'; // Import List from Material-UI
import ListItem from '@mui/material/ListItem'; // Import ListItem from Material-UI
import ListItemText from '@mui/material/ListItemText';
import CreateCard from './CreateCard';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { AUTHContext } from '../Contexts/Authorization';
import axios from 'axios';
import Work from './Work';

function CardList({ list, board, setBoard }) {
  const { apiKey, apiToken } = useContext(AUTHContext);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/lists/${list.id}/cards?key=${apiKey}&token=${apiToken}`
      )
      .then(function (response) {
        setCards(response.data);
      });
  }, []);

  const deleteList = () => {
    axios
      .put(
        `https://api.trello.com/1/lists/${list.id}/closed?key=${apiKey}&token=${apiToken}`,
        {
          value: true
        }
      )
      .then(function (response) {
        setBoard(board.filter((item) => item.id !== list.id));
      });
  };

  return (
    <div id={list.id}>
      <Paper sx={{ width: 320, maxWidth: '100%' }}>
        <List>
          <ListItem key={'title'}>
            <ListItemText>
              <h1>{list.name}</h1>
            </ListItemText>
            <IconButton
              color='error'
              size='small'
              aria-label='send'
              onClick={deleteList}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
          <Divider />
          {cards.map((card, index) => (
            <div key={index}>
              <ListItem key={index}>
                <ListItemText>
                  <Work card={card} cards={cards} setCards={setCards} />
                </ListItemText>
              </ListItem>
              <Divider />
            </div>
          ))}
          <ListItem
          key={'createCard'}
            sx={{
              backgroundColor: 'lightblue',
              margin: '10px auto',
              width: '95%',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            <ListItemText>
              <CreateCard cards={cards} setCards={setCards} listId={list.id} />
            </ListItemText>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
}

export default CardList;
