import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function CardBoard({ board }) {
  const navigate = useNavigate();
  console.log(board.name);

  const handleClick = () => {
    navigate(`/boards/${board.id}`, { state: { boardName: `${board.name}` } });
  };

  return (
    <Card
      onClick={handleClick}
      style={{ cursor: 'pointer', margin: '1rem' }}
      elevation={3}
      sx={{ minWidth: 345 }}
      spacing={4}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={
          !board.prefs.backgroundImage
            ? 'https://source.unsplash.com/random'
            : board.prefs.backgroundImage
        }
        title={board.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {board.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
