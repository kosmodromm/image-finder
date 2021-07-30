import './App.scss';
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
            <Header />
            <Main />
            <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
