import { createSlice } from "@reduxjs/toolkit";

const windowManagerSlice = createSlice({
  name: "windowManager",
  initialState: {
    windows: [],
    nextZIndex: 1000,
  },
  reducers: {
    openWindow: (state, action) => {
      const windowConfig = action.payload;

      // Check if a window of this type already exists
      if (windowConfig.windowType) {
        const existingWindow = state.windows.find(
          (w) => w.windowType === windowConfig.windowType && !w.closing
        );

        if (existingWindow) {
          // Window of this type exists, bring it to front and un-minimize
          const currentZIndex = state.nextZIndex;
          state.nextZIndex += 1;
          const index = state.windows.findIndex(
            (w) => w.id === existingWindow.id
          );
          if (index !== -1) {
            state.windows[index].zIndex = currentZIndex;
            state.windows[index].minimized = false;
          }
          return;
        }
      }

      // No existing window found, create a new one
      const windowId = Date.now() + Math.random();
      const currentZIndex = state.nextZIndex;
      state.nextZIndex += 1;

      // Use the provided size/position, or calculate defaults
      // Ensure size values are integers and valid
      let parsedSize = {
        width: 800,
        height: 600,
      };

      if (windowConfig.size) {
        parsedSize = {
          width: Math.max(
            400,
            Math.round(Number(windowConfig.size.width) || 800)
          ),
          height: Math.max(
            300,
            Math.round(Number(windowConfig.size.height) || 600)
          ),
        };
      }

      const menuBarHeight = 28;
      const titleBarHeight = 40; // Account for TitleBar height

      // Calculate centered position if not provided
      let finalPosition;
      if (windowConfig.position) {
        // Use provided position, ensure it's parsed correctly
        finalPosition = {
          x: Math.round(Number(windowConfig.position.x) || 0),
          y: Math.round(Number(windowConfig.position.y) || 0),
        };
      } else {
        // Calculate centered position
        finalPosition = {
          x: Math.round((window.innerWidth - parsedSize.width) / 2),
          y: Math.round(
            (window.innerHeight -
              parsedSize.height -
              menuBarHeight -
              titleBarHeight) /
              2 +
              menuBarHeight
          ),
        };
      }

      const newWindow = {
        id: windowId,
        zIndex: currentZIndex,
        minimized: false,
        maximized: false,
        closing: false,
        position: finalPosition,
        size: parsedSize,
        ...windowConfig, // Spread config last to allow overriding content, title, etc.
      };

      state.windows.push(newWindow);
    },

    closeWindow: (state, action) => {
      const windowId = action.payload;
      const windowToClose = state.windows.find((w) => w.id === windowId);

      if (!windowToClose) return;

      // Mark windows as closing (actual removal handled by removeWindow action)
      const windowsToClose = windowToClose?.groupId
        ? state.windows.filter((w) => w.groupId === windowToClose.groupId)
        : [windowToClose];

      // Set closing flag for all windows to be closed
      for (const w of windowsToClose) {
        const index = state.windows.findIndex((win) => win.id === w.id);
        if (index !== -1) {
          state.windows[index].closing = true;
        }
      }
    },

    removeWindow: (state, action) => {
      const windowId = action.payload;
      const windowToRemove = state.windows.find((w) => w.id === windowId);

      if (!windowToRemove) return;

      if (windowToRemove?.groupId) {
        state.windows = state.windows.filter(
          (w) => w.groupId !== windowToRemove.groupId
        );
      } else {
        state.windows = state.windows.filter((w) => w.id !== windowId);
      }
    },

    minimizeWindow: (state, action) => {
      const windowId = action.payload;
      const index = state.windows.findIndex((w) => w.id === windowId);
      if (index !== -1) {
        state.windows[index].minimized = !state.windows[index].minimized;
      }
    },

    maximizeWindow: (state, action) => {
      const windowId = action.payload;
      const index = state.windows.findIndex((w) => w.id === windowId);
      if (index !== -1) {
        state.windows[index].maximized = !state.windows[index].maximized;
      }
    },

    bringToFront: (state, action) => {
      const windowId = action.payload;
      const currentZIndex = state.nextZIndex;
      state.nextZIndex += 1;

      const index = state.windows.findIndex((w) => w.id === windowId);
      if (index !== -1) {
        state.windows[index].zIndex = currentZIndex;
      }
    },

    updateWindowPosition: (state, action) => {
      const { windowId, position } = action.payload;
      const index = state.windows.findIndex((w) => w.id === windowId);
      if (index !== -1) {
        state.windows[index].position = position;
      }
    },

    updateWindowSize: (state, action) => {
      const { windowId, size } = action.payload;
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
      const index = state.windows.findIndex((w) => w.id === windowId);
      if (index !== -1) {
        state.windows[index].size = parsedSize;
      }
    },
  },
});

export const {
  openWindow,
  closeWindow,
  removeWindow,
  minimizeWindow,
  maximizeWindow,
  bringToFront,
  updateWindowPosition,
  updateWindowSize,
} = windowManagerSlice.actions;

export default windowManagerSlice.reducer;
