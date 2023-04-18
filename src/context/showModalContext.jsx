import { createContext, useContext, useState } from "react";

const showModalContext = createContext();

function ShowModalProvider(props) {
  const [showModal, setShowModal] = useState(false);
  const value = { showModal, setShowModal };
  return (
    <showModalContext.Provider
      value={value}
      {...props}
    ></showModalContext.Provider>
  );
}

function useShowModal() {
  const context = useContext(showModalContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within a AuthProvider");
  return context;
}

export { useShowModal, ShowModalProvider };
