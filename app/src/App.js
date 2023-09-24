import Header from './components/Header';
import Registry from './components/Registry';
import Footer from './components/Footer';
import ToggleButtons from './components/ToggleButtons';

import {AuthContextProvider} from './context/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
      <div className="app">
          <Header />
          <ToggleButtons />
          <Registry />
          <Footer />  
      </div>
    </AuthContextProvider>
  );
}

export default App;
