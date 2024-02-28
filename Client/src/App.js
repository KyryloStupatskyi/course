import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { Container, CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <NavBar />
      <Container className="appContainer" sx={{}}>
        <AppRouter />
      </Container>
    </BrowserRouter >
  );
}

export default App;
