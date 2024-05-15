// Styles
import "./App.css"

// React
import { useState } from "react"

import axios from "axios";

// Components
import QrReader from "./components/QrReader"

function App() {
  const [openQr, setOpenQr] = useState(false)
  return (
    <>
    <div className="App">
     
      <button onClick={() => setOpenQr(!openQr)}>
        {openQr ? "Close" : "Open"} QR Scanner
      </button>
      {openQr && <QrReader />}
    </div>
    </>
  )
}

export default App
