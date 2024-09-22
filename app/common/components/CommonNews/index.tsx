import * as React from "react";
import { Button, Typography, notification } from "antd";
import { reservationStore } from "../FloatGroup/Reservation/store";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ModuleScss from "./CommonNews.module.scss";
interface IHomeNotificationProps {}

const HomeNotification: React.FunctionComponent<IHomeNotificationProps> = (
  props
) => {
  const [api, contextHolder] = notification.useNotification({
    top: 24,
    maxCount: 1,
  });
  const news: any[] = useRecoilValue(reservationStore.news);
  React.useEffect(() => {
    if (news.length > 0)
      api.open({
        key: "this",
        icon: <ExclamationCircleOutlined className={ModuleScss.icon} />,
        message: (
          <>
            <Link to={`/newsroom`} className={ModuleScss.container}>
              <Typography.Paragraph type="success">
                {news[0]?.title?.rendered}
              </Typography.Paragraph>
            </Link>

            <Button
              className={ModuleScss.btn}
              type="primary"
              onClick={() => api.destroy("this")}
            >
              ok!
            </Button>
          </>
        ),
        closeIcon: null,
        duration: 0,
      });
  }, [news]);
  return contextHolder;
};

export default React.memo(HomeNotification);
