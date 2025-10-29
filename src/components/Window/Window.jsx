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

  const noTitleBar = window.noTitleBar || false;

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
        className={`window maximized ${noTitleBar ? "no-title-bar" : ""}`}
        style={{
          zIndex: window.zIndex,
        }}
        onClick={handleClick}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: window.closing ? 0.9 : 1,
          opacity: window.closing ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {!noTitleBar && (
          <TitleBar
            title={title}
            onClose={() => closeWindow(id)}
            onMinimize={() => minimizeWindow(id)}
            onMaximize={() => maximizeWindow(id)}
            maximized={window.maximized}
          />
        )}
        <div
          className="window-content"
          onClick={(e) => {
            // Allow clicks within content to work normally, prevent window focus on content click
            e.stopPropagation();
          }}
        >
          {content}
        </div>
      </motion.div>
    );
  }

  return (
    <Rnd
      position={{ x: window.position.x, y: window.position.y }}
      size={{ width: window.size.width, height: window.size.height }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      minWidth={noTitleBar ? window.size.width : 400}
      minHeight={noTitleBar ? window.size.height : 300}
      maxWidth={noTitleBar ? window.size.width : undefined}
      maxHeight={noTitleBar ? window.size.height : undefined}
      style={{ zIndex: window.zIndex }}
      dragHandleClassName={noTitleBar ? "" : "title-bar"}
      disableResizing={window.closing || noTitleBar ? true : undefined}
      disableDragging={window.closing ? true : undefined}
    >
      <motion.div
        className={`window ${noTitleBar ? "no-title-bar" : ""}`}
        onClick={handleClick}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: window.closing ? 0.9 : 1,
          opacity: window.closing ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {!noTitleBar && (
          <TitleBar
            title={title}
            onClose={() => closeWindow(id)}
            onMinimize={() => minimizeWindow(id)}
            onMaximize={() => maximizeWindow(id)}
            maximized={window.maximized}
          />
        )}
        <div
          className="window-content"
          onClick={(e) => {
            // Allow clicks within content to work normally, prevent window focus on content click
            e.stopPropagation();
          }}
        >
          {content}
        </div>
      </motion.div>
    </Rnd>
  );
};

export default Window;
