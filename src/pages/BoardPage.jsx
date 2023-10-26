import { AUTHContext } from '../components/Contexts/Authorization';
import axios from 'axios';
import React from 'react';
import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router';
import CardList from '../components/Board/CardList';
import { Stack } from '@mui/material';
import CreateList from '../components/Board/CreateList';
import Favicon from 'react-favicon';
import ApiError from '../components/errors/ApiErrors';
import Loader from '../components/Common/Loader';
import { useLocation } from 'react-router';

function BoardPage() {
  const { apiKey, apiToken } = useContext(AUTHContext);
  const { id } = useParams();
  const [board, setBoard] = useState([]);
  const [wrongurl, setWrongurl] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const {state:{boardName}} =useLocation();

  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/boards/${id}/lists?key=${apiKey}&token=${apiToken}`
      )
      .then(function (response) {
        setBoard(response.data);
        setLoading(false);

      })
      .catch(function (error) {
        if (error) {
          console.log(error);
        setMessage(error.response);
          setWrongurl(true);
        setLoading(false);

          
        }
      });
  }, []);

  useEffect(() => {
    document.title = `${boardName} | Trello`;
  }, []);

  if (wrongurl) {
    return (
      <ApiError message={message}/>
    );
  }
  return (
    <>{loading?<Loader/>:
    (<>
      <Favicon
        url={
          'https://cdn.icon-icons.com/icons2/3041/PNG/512/trello_logo_icon_189227.png'
        }
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          margin: '15px'
        }}
      >
        <h1> Showing Lists of board - {boardName}</h1>
      </div>
      <div>
        <h1>{board.name}</h1>
      </div>
      <Stack
        spacing={3}
        direction='row'
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
          alignItems: 'flex-start',
          m: 2,
          p: 1
        }}
      >
        {board.map((list) => (
          <CardList
            key={list.id}
            list={list}
            board={board}
            setBoard={setBoard}
          />
        ))}
        <CreateList lists={board} setLists={setBoard} boardId={id} />
      </Stack>
    </>)}
    </>
  );
}

export default BoardPage;
