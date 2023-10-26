import axios from 'axios';
import React from 'react';
import { useEffect, useContext, useState } from 'react';
import { AUTHContext } from '../components/Contexts/Authorization';
import CardBoard from '../components/Home/CardBoard';
import { Stack } from '@mui/material';
import CreateBoard from '../components/Home/CreateBoard';
import Favicon from 'react-favicon';
import ApiError from '../components/errors/ApiErrors';
import Loader from '../components/Common/Loader';

function HomePage() {
  const { apiKey, apiToken, memberId } = useContext(AUTHContext);
  const [boards, setBoards] = React.useState('');
  const [wrongurl, setWrongurl] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/members/${memberId}/boards?key=${apiKey}&token=${apiToken}`
      )
      .then(function (response) {
        setBoards(response.data);
        setLoading(false);
        document.title = 'Home Page';
      })
      .catch(function (error) {
          setMessage(error.response);
          setWrongurl(true);
          setLoading(false);
      });
  }, []);

  const boardsArray = [...boards];

  if (wrongurl) {
    return <ApiError message={message} />;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Favicon
            url={
              'https://cdn.icon-icons.com/icons2/3041/PNG/512/trello_logo_icon_189227.png'
            }
          />
          <Stack
            spacing={2}
            direction='row'
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              m: 3,
              p: 1
            }}
          >
            {boardsArray.map((board) => (
              <CardBoard key={board.id} board={board} />
            ))}
            <CreateBoard boards={boards} setBoards={setBoards} />
          </Stack>
        </>
      )}
    </>
  );
}

export default HomePage;
