import { useState } from "react";

const useSearchState = () => {
  const [state, setState] = useState({
    destination: "",
    checkIn: null,
    checkOut: null,
    adultCount: 1,
    childCount: 0,
  });

  const updateSearch = (newState) => {
    setState((prevState) => {
      const updatedState = { ...prevState, ...newState };

      // Ensure checkIn and checkOut are Date objects
      if (updatedState.checkIn && !(updatedState.checkIn instanceof Date)) {
        updatedState.checkIn = new Date(updatedState.checkIn);
      }
      if (updatedState.checkOut && !(updatedState.checkOut instanceof Date)) {
        updatedState.checkOut = new Date(updatedState.checkOut);
      }

      return updatedState;
    });
  };

  const handleClear = () => {
    setState({
      destination: "",
      checkIn: null,
      checkOut: null,
      adultCount: 1,
      childCount: 0,
    });
  };

  return [state, updateSearch, handleClear];
};

export default useSearchState;
