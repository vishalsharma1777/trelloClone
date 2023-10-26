import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { AUTHContext } from "../Contexts/Authorization";
import { useContext } from "react";


function DeleteCard({id,cards,setCards}) {
    const { apiKey, apiToken } = useContext(AUTHContext);


    const deleteCard = () => {
        axios
          .delete(
            `https://api.trello.com/1/cards/${id}?key=${apiKey}&token=${apiToken}`
          )
          .then(function (response) {
            setCards(cards.filter((item) => item.id !== id));
            
          });
      }

    return (  

        <IconButton aria-label="delete"  onClick={deleteCard}>
            <DeleteIcon color="error" />
        </IconButton>


    );
}

export default DeleteCard;