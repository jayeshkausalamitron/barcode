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
     <div>
      <button onClick={() => setOpenQr(!openQr)}>
        {openQr ? "Close" : "Open"} QR Scanner
      </button>
      </div>
      <div>
      {openQr && <QrReader />}
      </div>
    </div>
    </>
  )
}

export default App
