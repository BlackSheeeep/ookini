import * as React from "react";
import Home from "../views/Home";
import { RecoilRoot } from "recoil";
import appStylesHref from "../../public/antd.min.css";
import homeStore from "~/views/Home/store";

export async function loader() {
  await homeStore.init();
  await homeStore.getFeeplans();
  return homeStore;
}

import type { LinksFunction } from "@remix-run/node";
// existing imports

interface IHomeEntryProps {}

const HomeEntry: React.FunctionComponent<IHomeEntryProps> = (props) => {
  return <Home></Home>;
};

export default HomeEntry;
