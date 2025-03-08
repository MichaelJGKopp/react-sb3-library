// import { useState } from 'react'
import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";

export const App = () => {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <HomePage />
      <Footer />
    </>
  );
};
