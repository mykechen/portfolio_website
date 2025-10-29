import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";

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
  const windowsRef = useRef([]);

  // Keep ref in sync with state
  useEffect(() => {
    windowsRef.current = windows;
  }, [windows]);

  const openWindow = (windowConfig) => {
    // Check if a window of this type already exists (using ref for synchronous access)
    if (windowConfig.windowType) {
      const existingWindow = windowsRef.current.find(
        (w) => w.windowType === windowConfig.windowType && !w.closing
      );

      if (existingWindow) {
        // Window of this type exists, bring it to front and un-minimize
        const currentZIndex = nextZIndex;
        setNextZIndex((prev) => prev + 1);
        setWindows((prevWindows) =>
          prevWindows.map((w) =>
            w.id === existingWindow.id
              ? {
                  ...w,
                  zIndex: currentZIndex,
                  minimized: false,
                }
              : w
          )
        );
        return existingWindow.id;
      }
    }

    // No existing window found, create a new one
    const windowId = Date.now() + Math.random();
    const currentZIndex = nextZIndex;

    setWindows((prevWindows) => {
      // Calculate centered position if not provided
      const windowSize = windowConfig.size || { width: 800, height: 600 };
      const menuBarHeight = 28;

      const centeredPosition = windowConfig.position || {
        x: (window.innerWidth - windowSize.width) / 2,
        y:
          (window.innerHeight - windowSize.height - menuBarHeight) / 2 +
          menuBarHeight,
      };

      const newWindow = {
        id: windowId,
        ...windowConfig,
        zIndex: currentZIndex,
        minimized: false,
        maximized: false,
        closing: false,
        position: centeredPosition,
        size: windowSize,
      };
      return [...prevWindows, newWindow];
    });
    setNextZIndex((prev) => prev + 1);
    return windowId;
  };

  const closeWindow = (windowId) => {
    setWindows((prevWindows) => {
      const windowToClose = prevWindows.find((w) => w.id === windowId);

      if (!windowToClose) return prevWindows;

      // Mark windows as closing
      const windowsToClose = windowToClose?.groupId
        ? prevWindows.filter((w) => w.groupId === windowToClose.groupId)
        : [windowToClose];

      // Set closing flag for all windows to be closed
      const updatedWindows = prevWindows.map((w) =>
        windowsToClose.includes(w) ? { ...w, closing: true } : w
      );

      // After animation duration, actually remove the windows
      setTimeout(() => {
        setWindows((prev) => {
          if (windowToClose?.groupId) {
            return prev.filter((w) => w.groupId !== windowToClose.groupId);
          }
          return prev.filter((w) => w.id !== windowId);
        });
      }, 200); // Match animation duration

      return updatedWindows;
    });
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
