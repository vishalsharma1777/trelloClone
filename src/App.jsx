import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Common/NavBar'
import BoardPage from './pages/BoardPage';
import HomePage from './pages/HomePage';
import WrongRoute from './components/errors/WrongRoute';
import Authorization from './components/Contexts/Authorization';
import {  createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
const THEME = createTheme({
  palette: {
    mode: 'dark',
    // background: {
    //   default: 'black',
    //   paper: "rgb(29,33,37)"
    // }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    "fontSize": 16,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  }
});

function App() {
  return (
    // <ThemeProvider theme={THEME}>
    //   <CssBaseline />
    <Authorization>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage/> } />
      <Route path="/boards" element={<HomePage />} />
      <Route path="/boards/:id" element={<BoardPage />} />
      <Route path="*" element={<WrongRoute/> } />
    </Routes>
  </BrowserRouter>
  </Authorization>
  // </ThemeProvider>
  )
}

export default App
