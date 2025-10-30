import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MenuBar from "./components/MenuBar/MenuBar";
import Desktop from "./components/Desktop/Desktop";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="app-container h-screen w-screen overflow-hidden bg-black">
        <MenuBar />
        <Desktop />
      </div>
    </Provider>
  );
}

export default App;
