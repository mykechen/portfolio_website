import React from "react";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  bringToFront,
  updateWindowPosition,
  updateWindowSize,
  removeWindow,
} from "../../store/windowManagerSlice";
import TitleBar from "./TitleBar";
import "./Window.css";

const Window = ({ id, title, content }) => {
  const dispatch = useAppDispatch();
  const windows = useAppSelector((state) => state.windowManager.windows);

  const window = windows.find((w) => w.id === id);

  if (!window || window.minimized) return null;

  const noTitleBar = window.noTitleBar || false;

  const handleClick = () => {
    dispatch(bringToFront(id));
  };

  const handleDragStop = (e, d) => {
    if (!window.maximized) {
      dispatch(
        updateWindowPosition({ windowId: id, position: { x: d.x, y: d.y } })
      );
    }
  };

  const handleClose = () => {
    dispatch(closeWindow(id));
    // Remove window after animation (handle groups if needed)
    setTimeout(() => {
      dispatch(removeWindow(id));
    }, 200);
  };

  const updateResizeState = (ref, position) => {
    if (!window.maximized) {
      // Extract numeric values from style string (e.g., "800px" -> 800)
      const width = Number.parseInt(ref.style.width, 10) || ref.offsetWidth;
      const height = Number.parseInt(ref.style.height, 10) || ref.offsetHeight;

      dispatch(updateWindowSize({ windowId: id, size: { width, height } }));
      dispatch(updateWindowPosition({ windowId: id, position }));
    }
  };

  const handleResize = (e, direction, ref, delta, position) => {
    updateResizeState(ref, position);
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    updateResizeState(ref, position);
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
            onClose={handleClose}
            onMinimize={() => dispatch(minimizeWindow(id))}
            onMaximize={() => dispatch(maximizeWindow(id))}
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
      onResize={handleResize}
      onResizeStop={handleResizeStop}
      minWidth={noTitleBar ? window.size.width : 400}
      minHeight={noTitleBar ? window.size.height : 300}
      maxWidth={noTitleBar ? window.size.width : undefined}
      maxHeight={noTitleBar ? window.size.height : undefined}
      style={{ zIndex: window.zIndex }}
      dragHandleClassName={noTitleBar ? "" : "title-bar"}
      disableResizing={window.closing || noTitleBar ? true : undefined}
      disableDragging={window.closing ? true : undefined}
      enableResizing={
        window.closing || noTitleBar
          ? {}
          : {
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }
      }
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
            onClose={handleClose}
            onMinimize={() => dispatch(minimizeWindow(id))}
            onMaximize={() => dispatch(maximizeWindow(id))}
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
