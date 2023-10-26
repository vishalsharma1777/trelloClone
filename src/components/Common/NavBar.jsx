import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='info'>
        
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link to='/boards'>
              <Button color='secondary' variant='contained'>
                Boards
              </Button>
            </Link>
          </Typography>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link to='/'>
              <div>
                <img src='https://trello.com/assets/87e1af770a49ce8e84e3.gif' className='trelloImg'/>
              </div>
            </Link>
          </Typography>
          <Typography variant='h6' component='div'>
          <Link to='https://trello.com/u/vishalsharma494'>
          <Avatar alt="Vishal Sharma" src='https://w0.peakpx.com/wallpaper/208/752/HD-wallpaper-whatsapp-dp-cartoon.jpg' />
          </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
