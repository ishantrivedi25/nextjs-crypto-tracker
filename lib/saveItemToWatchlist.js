import { toast } from "react-toastify";

export const saveItemToWatchlist = (e, id) => {
  e.preventDefault();

  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (watchlist.includes(id)) {
    toast.error(`${capitalizeFirstLetter(id)} - is already added to the watchlist!`);
  } else {
    watchlist.push(id);
    toast.success(`${capitalizeFirstLetter(id)} - added to the watchlist`);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
};

// Helper function for capitalizing the first letter
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
