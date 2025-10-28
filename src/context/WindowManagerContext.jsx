import React, { createContext, useContext, useState, useMemo } from "react";

const WindowManagerContext = createContext();

export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error(
      "useWindowManager must be used within WindowManagerProvider"
    );
  }
  return context;
};

const WindowManagerProvider = ({ children }) => {
  const [windows, setWindows] = useState([]);
  const [nextZIndex, setNextZIndex] = useState(1000);

  const openWindow = (windowConfig) => {
    const newWindow = {
      id: Date.now(),
      ...windowConfig,
      zIndex: nextZIndex,
      minimized: false,
      maximized: false,
      position: windowConfig.position || {
        x: 50 + windows.length * 30,
        y: 50 + windows.length * 30,
      },
      size: windowConfig.size || { width: 800, height: 600 },
    };

    setWindows([...windows, newWindow]);
    setNextZIndex(nextZIndex + 1);
    return newWindow.id;
  };

  const closeWindow = (windowId) => {
    setWindows(windows.filter((w) => w.id !== windowId));
  };

  const minimizeWindow = (windowId) => {
    setWindows(
      windows.map((w) =>
        w.id === windowId ? { ...w, minimized: !w.minimized } : w
      )
    );
  };

  const maximizeWindow = (windowId) => {
    setWindows(
      windows.map((w) =>
        w.id === windowId ? { ...w, maximized: !w.maximized } : w
      )
    );
  };

  const bringToFront = (windowId) => {
    setWindows(
      windows.map((w) =>
        w.id === windowId
          ? { ...w, zIndex: nextZIndex }
          : { ...w, zIndex: w.zIndex }
      )
    );
    setNextZIndex(nextZIndex + 1);
  };

  const updateWindowPosition = (windowId, position) => {
    setWindows(
      windows.map((w) => (w.id === windowId ? { ...w, position } : w))
    );
  };

  const updateWindowSize = (windowId, size) => {
    const parsedSize = {
      width:
        typeof size.width === "string"
          ? Number.parseInt(size.width, 10)
          : size.width,
      height:
        typeof size.height === "string"
          ? Number.parseInt(size.height, 10)
          : size.height,
    };
    setWindows(
      windows.map((w) => (w.id === windowId ? { ...w, size: parsedSize } : w))
    );
  };

  const value = useMemo(
    () => ({
      windows,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      bringToFront,
      updateWindowPosition,
      updateWindowSize,
    }),
    [windows, nextZIndex]
  );

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
};

export default WindowManagerProvider;
