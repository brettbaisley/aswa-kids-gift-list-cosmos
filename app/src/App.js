import React, {useState} from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Registry from './components/Registry';

import { AuthContext } from './context/AuthContext';


const App = () => {
  const [authContext, setAuthContext] = useState();

  return (
    <AuthContext.Provider value={ [authContext, setAuthContext] }>
      <Header />
      <Registry />
      <Footer />  
    </AuthContext.Provider>
  );
}

export default App;
