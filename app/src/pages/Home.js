import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Registry from '../components/Registry';
import {AuthContextProvider} from '../context/AuthContext';


const HomePage = () => {
  return (
    <AuthContextProvider>
      <div className="app">
          <Header />
          <Registry />
          <Footer />  
      </div>
    </AuthContextProvider>
  )
};

export default HomePage;