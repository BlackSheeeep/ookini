import * as React from "react";
import { advantageDialogStore } from "./store";
import utils from "~/common/utils";
import { Modal } from "antd";
import MiniAdvantage from "~/views/Home/components/Advantage/Mini";
import ModuleScss from "./CommonAdvantageDialog.module.scss";

interface ICommonAdvantageDialogProps {}

const CommonAdvantageDialog: React.FunctionComponent<
  ICommonAdvantageDialogProps
> = (props) => {
  const [displayAdvantageDialog, setDisplayAdvantageDialog] =
    React.useState(false);

  const KEY = "has_displayed_advantage";
  advantageDialogStore.useInit();

  React.useLayoutEffect(() => {
    const localData = localStorage.getItem(KEY);
    if (localData && Date.now() - Number(localData) < 30 * 60 * 1000) {
      return;
    }
    setDisplayAdvantageDialog(true);
  }, []);
  return utils.isMobileDevice ? (
    <Modal
      onCancel={() => {
        setDisplayAdvantageDialog(false);
        localStorage.setItem(KEY, Date.now().toString());
      }}
      footer={null}
      open={displayAdvantageDialog}
      className={ModuleScss.dialog}
      styles={{
        content: {},
      }}
    >
      <MiniAdvantage />
    </Modal>
  ) : null;
};

export default CommonAdvantageDialog;
