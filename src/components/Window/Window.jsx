import React from "react";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";
import { useWindowManager } from "../../context/WindowManagerContext";
import TitleBar from "./TitleBar";
import "./Window.css";

const Window = ({ id, title, content }) => {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
    updateWindowPosition,
    updateWindowSize,
    windows,
  } = useWindowManager();

  const window = windows.find((w) => w.id === id);

  if (!window || window.minimized) return null;

  const handleClick = () => {
    bringToFront(id);
  };

  const handleDragStop = (e, d) => {
    if (!window.maximized) {
      updateWindowPosition(id, { x: d.x, y: d.y });
    }
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    if (!window.maximized) {
      updateWindowSize(id, {
        width: ref.style.width,
        height: ref.style.height,
      });
      updateWindowPosition(id, position);
    }
  };

  if (window.maximized) {
    return (
      <motion.div
        className="window maximized"
        style={{
          zIndex: window.zIndex,
        }}
        onClick={handleClick}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <TitleBar
          title={title}
          onClose={() => closeWindow(id)}
          onMinimize={() => minimizeWindow(id)}
          onMaximize={() => maximizeWindow(id)}
          maximized={window.maximized}
        />
        <div className="window-content">{content}</div>
      </motion.div>
    );
  }

  return (
    <Rnd
      position={{ x: window.position.x, y: window.position.y }}
      size={{ width: window.size.width, height: window.size.height }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      bounds="window"
      minWidth={400}
      minHeight={300}
      style={{ zIndex: window.zIndex }}
    >
      <motion.div
        className="window"
        onClick={handleClick}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <TitleBar
          title={title}
          onClose={() => closeWindow(id)}
          onMinimize={() => minimizeWindow(id)}
          onMaximize={() => maximizeWindow(id)}
          maximized={window.maximized}
        />
        <div className="window-content">{content}</div>
      </motion.div>
    </Rnd>
  );
};

export default Window;
