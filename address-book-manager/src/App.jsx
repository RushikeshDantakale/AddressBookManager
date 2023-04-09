import HomePage from "./pages/HomePage";
import Edit from "./components/Edit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/edit" element={<Edit />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
