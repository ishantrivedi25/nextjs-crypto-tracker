import { toast } from "react-toastify";

export const removeItemFromWatchlist = (e, id, setIsCoinAdded) => {
  e.preventDefault();

  if (!window.confirm("Are you sure you want to remove this coin?")) {
    toast.error(`${capitalizeFirstLetter(id)} - could not be removed!`);
    setIsCoinAdded(true);
    return;
  }

  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const updatedWatchlist = watchlist.filter((coin) => coin !== id);

  // Avoid setting to an empty array if nothing changes
  if (updatedWatchlist.length !== watchlist.length) {
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    setIsCoinAdded(false);
    toast.success(`${capitalizeFirstLetter(id)} - has been removed!`);
  } else {
    toast.error(`${capitalizeFirstLetter(id)} - could not be removed!`);
    setIsCoinAdded(true);
  }
};

// Helper function for capitalizing the first letter
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};