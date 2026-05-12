import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { Toaster } from "sonner"


function App() {
  

  return (
    <BrowserRouter>
      <AppRouter/>
      <Toaster position="top-center"/>
    </BrowserRouter>
  )
}

export default App
