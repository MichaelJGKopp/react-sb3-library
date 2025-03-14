import React, { useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
  showItemsPerPage?: boolean;
  itemsPerPage?: number;
  setItemsPerPage?: (items: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
  showItemsPerPage = false,
  itemsPerPage = 5,
  setItemsPerPage,
}) => {
  // Add keyboard event listener for arrow keys
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && currentPage > 1) {
        paginate(currentPage - 1);
      } else if (event.key === "ArrowRight" && currentPage < totalPages) {
        paginate(currentPage + 1);
      }
    };

    // Add event listener
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, totalPages, paginate]); // Dependencies array

  return (
    <div className="row">
      <div className="col-md-7 offset-md-1 d-flex justify-content-center">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {/* First Page Button */}
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
              >
                First Page
              </button>
            </li>

            {/* Previous Arrow Button */}
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                &laquo;
              </button>
            </li>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (pageNum) =>
                  pageNum >= Math.max(1, currentPage - 2) &&
                  pageNum <= Math.min(currentPage + 2, totalPages)
              )
              .map((pageNum) => (
                <li
                  className={`page-item ${
                    pageNum === currentPage ? "active" : ""
                  }`}
                  key={pageNum}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(pageNum)}
                  >
                    {pageNum}
                  </button>
                </li>
              ))}

            {/* Next Arrow Button */}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                &raquo;
              </button>
            </li>

            {/* Last Page Button */}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => paginate(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last page
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Optional Items Per Page Selector - no changes here */}
      {showItemsPerPage && setItemsPerPage && (
        <div className="col-md-4">
          <div className="ms-3 mb-3 d-flex justify-content-center align-items-center">
            <label className="me-2 mb-0">Items per page:</label>
            <select
              className="form-select"
              style={{ width: "auto" }}
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                paginate(1);
              }}
              aria-label="Items per page"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
