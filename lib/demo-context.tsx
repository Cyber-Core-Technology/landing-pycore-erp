"use client";
import { createContext, useContext, useState, useCallback } from "react";

interface DemoModalCtx {
  isOpen: boolean;
  defaultPlan: string;
  openModal: (plan?: string) => void;
  closeModal: () => void;
}

const DemoModalContext = createContext<DemoModalCtx>({
  isOpen: false,
  defaultPlan: "",
  openModal: () => {},
  closeModal: () => {},
});

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen,      setIsOpen]      = useState(false);
  const [defaultPlan, setDefaultPlan] = useState("");

  const openModal  = useCallback((plan = "") => { setDefaultPlan(plan); setIsOpen(true);  }, []);
  const closeModal = useCallback(()           => { setIsOpen(false);                       }, []);

  return (
    <DemoModalContext.Provider value={{ isOpen, defaultPlan, openModal, closeModal }}>
      {children}
    </DemoModalContext.Provider>
  );
}

export const useDemoModal = () => useContext(DemoModalContext);
