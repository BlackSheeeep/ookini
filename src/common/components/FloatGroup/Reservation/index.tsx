import { FloatButton, Typography } from "antd";
import * as React from "react";
import ModuleScss from "./Reservation.module.scss";
import { reservationStore } from "./store";

interface IReservationProps {}

const Reservation: React.FunctionComponent<IReservationProps> = (props) => {
  return (
    <>
      <FloatButton
        type="primary"
        shape="circle"
        onClick={() => reservationStore.updateState?.({ visible: false })}
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
