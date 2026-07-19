import { createContext, useContext, useEffect, useState } from "react";

const MODE_KEY = "launchloom-venture-mode";

const VentureModeContext = createContext();

export function VentureModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try {
      const stored = window.localStorage.getItem(MODE_KEY);
      return stored === "focus" ? "focus" : "venture";
    } catch {
      return "venture";
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(MODE_KEY, mode);
    } catch {
      /* noop */
    }
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "venture" ? "focus" : "venture"));
  };

  return (
    <VentureModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </VentureModeContext.Provider>
  );
}

export function useVentureMode() {
  const ctx = useContext(VentureModeContext);
  if (!ctx) {
    throw new Error("useVentureMode must be used within VentureModeProvider");
  }
  return ctx;
}
