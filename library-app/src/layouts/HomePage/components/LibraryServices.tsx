import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const LibraryServices = () => {
  const { authState } = useOktaAuth();

  return (
    <div className="container my-5">
      <div className="row p-4 align-items-center border shadow-lg">
        <div className="col-lg-7 p-3">
          <h1 className="display-5 fw-bold">
            Can't find what you're looking for?
          </h1>
          <p className="lead">
            If you can not find what you are looking for, please let us know. We
            will be able to provide you with the best content possible.
          </p>
          <div className="d-grid justify-content-md-start mb-3 mb-lg-3 gap-2">
            {authState?.isAuthenticated ? (
              <Link
                type="button"
                className="btn main-color text-white btn-lg px-4 fw-bold "
                to="services" // ToDo: Change to the correct route for library services
              >
                Library Services
              </Link>
            ) : (
              <Link
                type="button"
                className="btn main-color text-white btn-lg px-4 fw-bold me-md-2"
                to="/login"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
        <div className="col-lg-4 offset-lg-1 shadow-lg lost-image"></div>
      </div>
    </div>
  );
};
