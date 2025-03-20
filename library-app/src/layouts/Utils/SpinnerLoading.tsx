export const SpinnerLoading = ({height = "550px"}:{height?: string}) => {
    return (
        <div className="container m-5 d-flex justify-content-center" 
        style={{height: `${height}`}} >
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">
                    Loading...
                </span>
            </div>
        </div>
    );
}