export const LibraryServices = () => {
    return (
        <div className="container my-5">
            <div className="row p-4 align-items-center border shadow-lg">
                <div className="col-lg-7 p-3">
                    <h1 className="display-5 fw-bold">
                        Can't find what you're looking for?
                    </h1>
                    <p className="lead">
                        If you can not find what you are looking for, please let us know.
                        We will be able to provide you with the best content possible.
                    </p>
                    <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
                        <a className="btn main-color text-white btn-lg" href="#">
                            Sign up
                        </a>
                    </div>
                </div>
                <div className="col-lg-4 offset-lg-1 shadow-lg lost-image"></div>
            </div>
        </div>
    );
}