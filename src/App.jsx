import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useAppSelector } from "./store/hooks";
import MenuBar from "./components/MenuBar/MenuBar";
import Desktop from "./components/Desktop/Desktop";
import Dock from "./components/Dock/Dock";
import Window from "./components/Window/Window";
import MobileWarningModal from "./components/MobileWarning/MobileWarningModal";
import "./App.css";

function AppContent() {
  const windows = useAppSelector((state) => state.windowManager.windows);
  const [isMobileModalVisible, setIsMobileModalVisible] = useState(false);

  return (
    <div className="app-container h-screen w-screen overflow-hidden bg-black">
      <MobileWarningModal
        isVisible={isMobileModalVisible}
        setIsVisible={setIsMobileModalVisible}
      />
      <MenuBar />
      <Desktop />
      {/* Render windows at app level so maximized windows can cover MenuBar */}
      {windows.map(
        (window) =>
          !window.minimized && (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              content={window.content}
            />
          )
      )}
      <Dock hideDockForMobile={isMobileModalVisible} />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
