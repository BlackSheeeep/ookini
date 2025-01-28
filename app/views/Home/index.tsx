import React from "react";
import Carousel from "./components/Carousel";
import MenuAnchor from "./components/MenuAnchor";
import FeePlan from "./components/FeePlan";
import Stores from "./components/Stores";
import AdvantageType from "./components/Advantage";
import RentSteps from "./components/RentSteps";
import CustomerImages from "./components/CustomerImages";
import FQA from "./components/FAQ";
import RecommendSpot from "./components/RecommendSpot";
import Blogs from "../Blog/List";
import { Divider } from "antd";
import { atom } from "recoil";
import SelectArea from "./components/SelectArea";
export const selectedArea = atom({
  key: "selectedArea",
  default: null,
});
export const Home = () => {
  //@ts-ignore
  return (
    //@ts-ignore
    <>
      <Carousel />
      <MenuAnchor />
      <SelectArea />
      <FeePlan />
      <Divider />
      <Stores />
      <Divider />
      <AdvantageType />
      <Divider />
      <RentSteps />
      <Divider />
      <CustomerImages />
      <Divider />
      <FQA />
      <Divider />
      <RecommendSpot />
      <Divider />
      <Blogs />
    </>
  );
};
export default Home;
