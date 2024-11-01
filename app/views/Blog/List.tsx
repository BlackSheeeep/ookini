import { Flex, List } from "antd";
import * as React from "react";
import ModuleScss from "./Blogs.module.scss";
import Loading from "~/common/components/Loading";
import { HOME_KEYS } from "~/common/constants/config";
import CommonTitle from "~/common/components/CommonTitle";
import { Typography } from "antd";
import _ from "lodash";
import { useLoaderData } from "@remix-run/react";
import { BlogsDetailData } from "~/routes/blogs";
import homeStore from "../Home/store";
const { Link } = Typography;
interface IBlogsProps {}
const blogsId = HOME_KEYS.blog;

const Blogs: React.FunctionComponent<IBlogsProps> = (props) => {
  const { blogs } = useLoaderData<BlogsDetailData>();
  const [data, setData] = React.useState(blogs);
  React.useLayoutEffect(() => {
    if (!data) {
      (async () => {
        const res = await homeStore.getBlogs();
        setData(res);
      })();
    }
  });
  return (
    <Flex align="center" vertical className={ModuleScss.container}>
      <CommonTitle level={4} title="ブログ" subTitle="Blogs" />
      {_.isEmpty(data) ? (
        <Loading></Loading>
      ) : (
        <List
          id={blogsId}
          className={ModuleScss.list}
          dataSource={data}
          renderItem={(item: any, index) => {
            return (
              <List.Item style={{ width: "100%" }}>
                <Link href={item.link}>
                  <List.Item.Meta
                    title={item.date}
                    description={item.title}
                    className={ModuleScss.listItem}
                    key={index}
                  />
                </Link>
              </List.Item>
            );
          }}
        />
      )}
    </Flex>
  );
};

export default Blogs;
