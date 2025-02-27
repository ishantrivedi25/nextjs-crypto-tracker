import Pagination from "@mui/material/Pagination";

import styles from "./pagination.module.css";

export default function PaginationControlled({ page, handlePageChange }) {
  return (
    <div className={styles.paginationDiv}>
      <Pagination
        sx={{
          "& .MuiPaginationItem-text": {
            color: "var(--grey) !important",
            border: "1px solid var(--grey)",
          },
          "& .MuiPaginationItem-text:hover": {
            backgroundColor: "transparent !important",
          },
          "& .Mui-selected  ": {
            backgroundColor: "var(--blue)",
            borderColor: "var(--blue)",
          },
          "& .MuiPaginationItem-ellipsis": {
            border: "none",
          },
        }}
        count={10}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
}
