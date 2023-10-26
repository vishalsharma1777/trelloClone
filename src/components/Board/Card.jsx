import React, { useEffect } from 'react';
import { AUTHContext } from '../Contexts/Authorization';
import axios from 'axios';
import { useContext, useState } from 'react';
import CreateChecklist from '../card/CreateChecklist';
import CreateItem from '../card/CreateItem';
import { Divider } from '@mui/material';
import DeleteChecklist from '../card/DeleteChecklist';
import Item from '../card/Item';
import ProgressBar from '../card/ProgressBar';
import CircularProgress from '@mui/material/CircularProgress';


function Card({ card }) {
  const { apiKey, apiToken } = useContext(AUTHContext);

  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/cards/${card.id}/checklists?key=${apiKey}&token=${apiToken}`
      )
      .then(function (response) {
        setChecklists(response.data);
        setLoading(false);
      });
  }, []);

  return (
    <>
    {loading?<div style={
      {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }
    }><CircularProgress color="secondary"/></div> :
    <div>
      {checklists.map((checklist, index) => (
        <div
          key={index}
          style={{
            border: '1px solid black',
            borderRadius: '5px',
            padding: '10px',
            margin: '10px',
            width: '300px',
            backgroundColor: '#d9ecf5'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <h1>{checklist.name}</h1>
            <DeleteChecklist
              checklistId={checklist.id}
              checklists={checklists}
              setChecklists={setChecklists}
            />
          </div>
          <Divider />
          {checklist.checkItems.length === 0 ? (
            ''
          ) : (
            <ProgressBar checklist={checklist} />
          )}

          <ul
            style={{
              listStyleType: 'none',
              padding: '0px',
              margin: '0px'
            }}
          >
            {checklist.checkItems.map((checkItem, index) => (
              <li key={index}>
                <Item
                  checkItem={checkItem}
                  checklists={checklists}
                  setChecklists={setChecklists}
                />
              </li>
            ))}
          </ul>
          <CreateItem
            checklistId={checklist.id}
            checklists={checklists}
            setChecklists={setChecklists}
          />
        </div>
      ))}

      <CreateChecklist
        cardId={card.id}
        setChecklists={setChecklists}
        checklists={checklists}
      />
    </div>}
    </>
  );
}

export default Card;
