import { useOktaAuth } from "@okta/okta-react";
import { Link, NavLink } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinnerLoading />;
  }

  const handleLogout = async () => oktaAuth.signOut();

  console.log("authState", authState);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Good Read
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/search"
              >
                Search Books
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {!authState.isAuthenticated ? (
              <li className="nav-item m-1">
                <Link
                  type="button"
                  className="btn btn-outline-light"
                  to="/login"
                >
                  Sign in
                </Link>
              </li>
            ) : (
              <li className="nav-item m-1">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
