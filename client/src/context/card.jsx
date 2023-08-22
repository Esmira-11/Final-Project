import { useState, useContext, createContext, useEffect } from "react";

const CardContext = createContext();
const CardProvider = ({ children }) => {
  const [card, setCard] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem('cart')
    if(existingCartItem) setCard(JSON.parse(existingCartItem))
  }, [])
  
  return (
    <CardContext.Provider value={[card, setCard]}>
      {children}
    </CardContext.Provider>
  );
};

// custom hook
const useCard = () => useContext(CardContext);

export { useCard, CardProvider };