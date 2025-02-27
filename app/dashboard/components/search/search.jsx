import SearchIcon from "@mui/icons-material/Search";

import styles from "./search.module.css";

function Search({ search, handleChange }) {
  return (
    <div className={styles.searchFlex}>
      <SearchIcon sx={{ color: "var(--grey)", fontSize: "1.2rem" }} />
      <input
        className={styles.searchInput}
        placeholder="Search"
        value={search}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}

export default Search;
