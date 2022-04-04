import { createContext, useReducer } from "react";
import { InitialState } from "../models/ThemeState";
import { CHANGE_COLOR, CHANGE_MODE } from "../types/Types";
import ThemeReducer from "../reducer/ThemeReducer";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(ThemeReducer, InitialState);

  const changeColor = (color) =>
    dispatch({ type: CHANGE_COLOR, payload: color });

  const changeMode = (mode) => dispatch({ type: CHANGE_MODE, payload: mode });

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
