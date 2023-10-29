import './App.css'
import { Auth } from './components/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";
import { NavBar } from './components/NavBar';
import { SignUp } from './components/auth/SignUp';
import { Tracker } from './components/tracker-details/Tracker';
import { TrackerHistory } from './components/tracker-details/TrackerHistory';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' exact element={<Auth/>}/>
          <Route path='/time-tracker' exact element={<NavBar/>}/>
          <Route path='/time-tracker/tracker' exact element={<Tracker/>}/>
          <Route path='/time-tracker/history' exact element={<TrackerHistory/>}/>
          <Route path='/sign-up' exact element={<SignUp/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
