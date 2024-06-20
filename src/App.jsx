import { useEffect } from 'react'
import Main from './Components/Main/Main'
import Sidebar from './Components/Sidebar/Sidebar'
import run from './Gemini/Gemini'

function App() {

  // useEffect(() => {
  //   ; (async () => {
  //     const runi = await run("what is react?")
  //     console.log((runi))
  //   })();
  // }, [])

  return (
    <>
      <Sidebar />
      <Main />
    </>
  )
}

export default App