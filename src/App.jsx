import { useEffect } from 'react'
import SideBar from './Components/Sidebar/Sidebar'
import Main from './Components/Main/Main'

function App() {

  // useEffect(() => {
  //   ; (async () => {
  //     const runi = await run("what is react?")
  //     console.log((runi))
  //   })();
  // }, [])

  return (
    <>
      <SideBar />
      <Main />
    </>
  )
}

export default App