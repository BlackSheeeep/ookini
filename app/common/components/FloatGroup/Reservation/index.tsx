import { FloatButton, Typography } from "antd";
import * as React from "react";
import ModuleScss from "./Reservation.module.scss";
import { useRecoilState } from "recoil";
import { recoilStates } from "..";

interface IReservationProps {}

const Reservation: React.FunctionComponent<IReservationProps> = (props) => {
  const [, setVisible] = useRecoilState(recoilStates.visible);
  return (
    <>
      <FloatButton
        type="primary"
        shape="circle"
        onClick={() => setVisible(true)}
        className={ModuleScss.container}
        icon={
          <Typography.Text type="warning" className={ModuleScss.icon}>
            予約
          </Typography.Text>
        }
      ></FloatButton>
    </>
  );
};

export default Reservation;
