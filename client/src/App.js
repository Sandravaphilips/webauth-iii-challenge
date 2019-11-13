import React, {useState} from 'react';
import { Route, NavLink } from "react-router-dom";
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Users from './components/Users';

function App() {
  const [isAllowed, setIsAllowed] = useState(true);
  return (
    <div className="App">
      <NavLink to='/'>Register</NavLink>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/users'>Users</NavLink>

      <Route exact path='/' component={SignUp} />
      <Route exact path='/login' render={(props) => 
        <SignIn {...props} isAllowed={isAllowed} />
      } />
      <Route exact path='/users' render={(props) => 
        <Users {...props} setIsAllowed={setIsAllowed} />
      }  />
    </div>
  );
}

export default App;
