import * as React from "react";
import ReservationForm from "./Form";
import "./reservation.scss";

interface IReservationProps {}

const Reservation: React.FunctionComponent<IReservationProps> = (props) => {
  return (
    <>
      <ReservationForm></ReservationForm>
    </>
  );
};

export default Reservation;
