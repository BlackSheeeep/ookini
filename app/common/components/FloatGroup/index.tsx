import { FloatButton } from "antd";
import * as React from "react";
import Reservation from "./Reservation";
import { UnorderedListOutlined } from "@ant-design/icons";
import utils from "~/common/utils";
import FormDialog from "./Reservation/FormDialog";
import MenuBar from "./Menu";
import { atom, useRecoilState } from "recoil";
interface IFloatGroupProps {}

export const recoilStates = {
  visible: atom({
    default: false,
    key: "awoofoiawef",
  }),
};
const FloatGroup: React.FunctionComponent<IFloatGroupProps> = (props) => {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      {utils.isMobileDevice ? (
        <MenuBar />
      ) : (
        <FloatButton.Group
          open={open}
          onClick={() => setOpen(!open)}
          trigger="click"
          icon={<UnorderedListOutlined />}
        >
          <Reservation />
        </FloatButton.Group>
      )}
    </>
  );
};

export default FloatGroup;
