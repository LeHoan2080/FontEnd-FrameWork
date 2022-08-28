import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from "./GlobalState";
import Header from './component/headers/Header'
import MainPages from './component/mainpages/Pages'
import Footer from './component/footer/Footer'
import SlideShowImg from "./component/slideImg/SlideShowImg";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header/>
          <SlideShowImg/>
          <MainPages/>
          <Footer/>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
