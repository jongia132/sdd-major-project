import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from "./applets/index"
import { Pomodoro } from './applets/Pomodoro'
import Settings from "./components/settings/settings"
import Layout from './components/Layout'
import { Tasks } from "./applets/Tasks"

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Index />} />
            <Route path='/pomodoro' element={<Pomodoro />}/>
            <Route path='/tasks' element={<Tasks />} />
          </Route>
          <Route path='/settings' element={<Settings />}/>
        </Routes>
      </BrowserRouter>
  );
}
export default App;