import * as React from "react";
import Home from "../../views/Home";
import { RecoilRoot } from "recoil";

interface IHomeEntryProps {}

const HomeEntry: React.FunctionComponent<IHomeEntryProps> = (props) => {
  return (
    <RecoilRoot>
      <Home></Home>
    </RecoilRoot>
  );
};

export default HomeEntry;
