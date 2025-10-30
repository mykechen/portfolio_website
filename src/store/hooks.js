import { useDispatch } from "react-redux";

// Typed hooks for use throughout the app
export const useAppDispatch = () => useDispatch();
export { useSelector as useAppSelector } from "react-redux";
