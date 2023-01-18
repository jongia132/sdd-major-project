import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Index from "./applets/index"
import Pomodoro from './applets/Pomodoro';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='/pomodoro' element={<Pomodoro/>}/>
        </Routes>
      </Router>
  );
}
export default App;