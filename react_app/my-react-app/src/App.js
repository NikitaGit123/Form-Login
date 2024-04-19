import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {
  return (
    <div className="App">
      {/* <Dashboard/> */}
      <Login/>
      {/* <Signup/> */}
    </div>
  );
}

export default App;
