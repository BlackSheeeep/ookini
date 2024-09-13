import "./App.css";
import { Button, Result } from "antd";
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
// import Home from "views/Home";
// import FeePlanDetail from "views/FeePlanDetail";
// import StoreDetail from "views/StoreDetail";
// import Gallery from "views/Gallery";
import utils from "common/utils";
import NewsroomList from "views/Newsroom/List";
// import BlogDetail from "views/Blog/Page";
import CommonLayout from "common/components/CommonLayout";
const Home = React.lazy(() => import("views/Home"));
const FeePlanDetail = React.lazy(() => import("views/FeePlanDetail"));
const StoreDetail = React.lazy(() => import("views/StoreDetail"));
const Gallery = React.lazy(() => import("views/Gallery"));
const BlogDetail = React.lazy(() => import("views/Blog/Page"));
function Routers() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<CommonLayout />}>
        <Route path="/" element={<Navigate to="/home" />} />,
        <Route path="/home" element={<Home />} />,
        <Route path="/feePlanDetail" element={<FeePlanDetail />} />,
        <Route path="/storeDetail" element={<StoreDetail />} />,
        <Route path="/gallery" element={<Gallery />} />,
        <Route path="/newsroom" element={<NewsroomList />} />,
        <Route path="/blogs" element={<BlogDetail />} />,
        <Route
          element={
            <Result
              status={404}
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Button
                  onClick={() => {
                    utils.goto("/home");
                  }}
                  type="primary"
                >
                  Back Home
                </Button>
              }
            />
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default Routers;
