
import { CustomProvider } from "rsuite";
import AuthProvider from "./contexts/authContext"
import { Rotas } from "./routes/Routes"
import 'rsuite/dist/rsuite.min.css';

function App() {

  return (
    <>
    <CustomProvider theme="dark">
    <AuthProvider>
     <Rotas/>
     </AuthProvider>
     </CustomProvider>
    </>
  )
}

export default App
