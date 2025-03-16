type CategorySelectionProp = {
  categorySelection: string;
  setCategorySelection: (categorySelection: string) => void;
  setSearchUrl: (searchUrl: string) => void;
  setPage: (page: number) => void;
};

export const CategorySelection = ({
  categorySelection,
  setCategorySelection,
  setSearchUrl,
  setPage
}: CategorySelectionProp) => {

  const categoryField = (value: string) => {
    const valueLower = value.toLowerCase();
    if (
      valueLower === "fe" ||
      valueLower === "be" ||
      valueLower === "data" ||
      valueLower === "devops"
    ) {
      setCategorySelection(value);
      setSearchUrl(`/search/findByCategory?category=${value}`);
    } else {
      setCategorySelection("All");
      setSearchUrl("");
    }
    setPage(1);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {categorySelection}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li onClick={() => categoryField("All")}>
          <a className="dropdown-item" href="#">
            All
          </a>
        </li>
        <li onClick={() => categoryField("FE")}>
          <a className="dropdown-item" href="#">
            Front End
          </a>
        </li>
        <li onClick={() => categoryField("BE")}>
          <a className="dropdown-item" href="#">
            Back End
          </a>
        </li>
        <li onClick={() => categoryField("Data")}>
          <a className="dropdown-item" href="#">
            Data
          </a>
        </li>
        <li onClick={() => categoryField("DevOps")}>
          <a className="dropdown-item" href="#">
            DevOps
          </a>
        </li>
      </ul>
    </div>
  );
};
