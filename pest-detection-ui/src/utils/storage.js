export const saveHistory = (data) => {
  localStorage.setItem("history", JSON.stringify(data));
};

export const getHistory = () => {
  return JSON.parse(localStorage.getItem("history")) || [];
};