import Header from './components/Header';
import Registry from './components//Registry';
import Footer from './components//Footer';

import {AuthContextProvider} from './context/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
      <div className="app">
          <Header />
          <Registry />
          <Footer />  
      </div>
    </AuthContextProvider>
  );
}

export default App;
