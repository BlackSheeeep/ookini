import * as React from "react";
import ReservationForm from "./Form";
import "./reservation.scss";
import Success from "./ReserveSuccess";
import { RESERVATION_STEPS } from "./constants";

interface IReservationProps {}

const Reservation: React.FunctionComponent<IReservationProps> = (props) => {
  const [steps, setSteps] = React.useState(0);
  const renderStep = () => {
    switch (steps) {
      case 0:
        return (
          <ReservationForm
            onSuccess={() => {
              setSteps(RESERVATION_STEPS.SUCCESS);
            }}
          ></ReservationForm>
        );
      case 1:
        return <Success></Success>;
      default:
        return null;
    }
  };
  return renderStep();
};

export default Reservation;
