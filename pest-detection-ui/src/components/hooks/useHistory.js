import { useState, useEffect } from "react";

export default function useHistory() {
  const [history, setHistory] = useState([]);

  // Load lần đầu
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(data);
  }, []);

  const addHistory = (item) => {
    setHistory((prev) => {
      const updated = [item, ...prev].slice(0, 10);
      localStorage.setItem("history", JSON.stringify(updated));
      return updated;
    });
  };


  const removeHistory = (id) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("history", JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("history");
  };

  return {
    history,
    addHistory,
    removeHistory,
    clearHistory,
  };
}