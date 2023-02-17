import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Index from "./applets/index"
import Pomodoro from './applets/Pomodoro'
import Settings from "./applets/settings"
import Layout from './components/Layout'

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Index />} />
            <Route path='/pomodoro' element={<Pomodoro/>}/>
          </Route>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;