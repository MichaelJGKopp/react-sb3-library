import { Route, Routes } from "react-router-dom";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { SearchBooksPage } from "./layouts/SearchBooksPage/SearchBooksPage";

export const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchBooksPage />} />
      </Routes>
      <Footer />
    </>
  );
};
