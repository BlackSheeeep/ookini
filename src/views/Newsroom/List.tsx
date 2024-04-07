import { newsroomStore } from "./store";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import NewsItem from "./Card";
import { Flex } from "antd";

const NewsroomList = () => {
  newsroomStore.useInit();

  useEffect(() => {
    newsroomStore.init();
  }, []);

  const news = useRecoilValue(newsroomStore.news);

  return (
    <Flex
      vertical
      gap="2rem"
      style={{
        width: "100vw",
        padding: "32px",
      }}
    >
      {news.map((n) => (
        <NewsItem
          key={n.id}
          imageUrl={n.image.guid}
          date={n.date}
          title={n.title.rendered}
          description={n.contents?.[0] ?? ""}
        />
      ))}
    </Flex>
  );
};

export default NewsroomList;
