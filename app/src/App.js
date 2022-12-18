import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Registry from './components/Registry';

import {AuthContextProvider} from './context/AuthContext';


const App = () => {
  return (
    <AuthContextProvider>
      <Header />
      <Registry />
      <Footer />  
    </AuthContextProvider>
  );
}

export default App;
