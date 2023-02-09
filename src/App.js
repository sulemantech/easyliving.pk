import logo from './logo.svg';
import './App.css';
import HeaderOne from './components/header/HeaderOne';
import FooterOne from './components/footer/FooterOne';
import Navigation from './components/navigation/Navigation';
function App() {
  return (
    <div className="App">
      <Navigation />
      <HeaderOne />
      <FooterOne />
      <FooterOne />

    </div>
  );
}

export default App;
