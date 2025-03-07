// import { useState } from 'react'
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { ExploreTopBooks } from "./layouts/HomePage/ExploreTopBooks";
import { Carousel } from "./layouts/HomePage/Carousel"

export const App = () => {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <ExploreTopBooks />
      <Carousel />
    </>
  );
}
