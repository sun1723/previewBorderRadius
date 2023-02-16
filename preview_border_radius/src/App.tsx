import { useState } from 'react'
import styles from './App.module.css'
import Box from "./Box";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.App}>
      <header>
          <div className={styles.container}>
              <Box side="left"/>
              <Box side="right"/>
              <Box side="top"/>
              <Box side="bottom"/>
          </div>
            <div>
                <input/>
                <button>Copy to ClipBoard</button>
            </div>
      </header>
    </div>
  )
}

export default App
