import React from "react";
import MenuBar from "./components/MenuBar/MenuBar";
import Desktop from "./components/Desktop/Desktop";
import WindowManagerProvider from "./context/WindowManagerContext";
import "./App.css";

function App() {
  return (
    <WindowManagerProvider>
      <div className="app-container h-screen w-screen overflow-hidden bg-black">
        <MenuBar />
        <Desktop />
      </div>
    </WindowManagerProvider>
  );
}

export default App;
