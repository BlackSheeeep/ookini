import { Flex, List } from "antd";
import * as React from "react";
import ModuleScss from "./Blogs.module.scss";
import Loading from "~/common/components/Loading";
import { HOME_KEYS } from "~/common/constants/config";
import CommonTitle from "~/common/components/CommonTitle";
import Link from "antd/lib/typography/Link";
import homeStore from "~/views/Home/store";
import { useRecoilValue } from "recoil";

interface IBlogsProps {}
const blogsId = HOME_KEYS.blog;

const Blogs: React.FunctionComponent<IBlogsProps> = (props) => {
  const { blogs } = homeStore;
  const data: Record<string, any>[] = useRecoilValue(blogs);
  React.useEffect(() => {
    homeStore.getBlogs();
  }, []);
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
