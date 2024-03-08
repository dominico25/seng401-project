import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./Main";
import Home from "./Home";
import Login from "./Login";
import UploadItem from "./UploadItem";
import BrowseItem from "./BrowseItem";
import BrowseOutfit from "./BrowseOutfit";
import CreateOutfit from "./CreateOutfit";
import GenerateOutfit from "./GenerateOutfit";
import Navigation from "./Navigation";
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Router>
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path = "/Home" element={<Home />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/UploadItem" element={<UploadItem />}/>
        <Route path="/BrowseItem" element={<BrowseItem />}/>
        <Route path="/BrowseOutfit" element={<BrowseOutfit />}/>
        <Route path="/CreateOutfit" element={<CreateOutfit />}/>
        <Route path="/GenerateOutfit" element={<GenerateOutfit />}/>
      </Routes>
    </Router>
    </ChakraProvider>
    

  );
}

export default App;