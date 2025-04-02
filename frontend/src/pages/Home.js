import React from "react";
import Marquee from "react-fast-marquee";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      
      <BannerProduct />

      {/* Fashion Marquee */}
      <Marquee
  speed={150}
  gradient={false}
  pauseOnHover={true}
  className="h-[15vh] flex items-center text-3xl font-bold uppercase tracking-wider bg-gray-900 text-white mt-10"
>
  <span className="mx-10">Fashion</span> 
  <span className="mx-10">Trendy Styles</span> 
  <span className="mx-10">New Arrivals</span> 
  <span className="mx-10">Latest Collections</span> 
  <span className="mx-10">Elevate Your Style</span> 
  <span className="mx-10">Exclusive Deals</span> 
  <span className="mx-10">Fashion</span> 
</Marquee>


      {/* <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} /> */}
      {/* <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"} /> */}

      <VerticalCardProduct category={"mobiles"}  />
      {/* <VerticalCardProduct category={"Mouse"} heading={"Mouse"} /> */}
      <VerticalCardProduct category={"televisions"} />
      {/* <VerticalCardProduct category={"camera"} heading={"Camera & Photography"} /> */}
      {/* <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} /> */}
      {/* <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"} /> */}
      {/* <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} /> */}
      {/* <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} /> */}
    </div>
  );
};

export default Home;
