/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Router } from './Router'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Router/>
      </div>
    </BrowserRouter>
  )
}

export default App
