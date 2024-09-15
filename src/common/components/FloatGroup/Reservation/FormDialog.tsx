import {
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Divider,
  Select,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "common/components/FormItem";
import ModuleScss from "./Reservation.module.scss";
import dayjs from "dayjs";
import * as React from "react";
import { reservationStore } from "./store";
import { useRecoilState, useRecoilValue } from "recoil";
import { RangePickerProps } from "antd/es/date-picker";
import { send } from "@emailjs/browser";
import utils from "common/utils";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
interface IFormDialogProps {
  visible?: boolean;
  onCancel?: () => void;
}

// eslint-disable-next-line arrow-body-style
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().subtract(1, "days");
};
const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

function generateDisabledMinutes(selectedMinutes: any, interval: any) {
  const disabledMinutes = [];
  for (let i = 0; i < 60; i += interval) {
    if (i !== selectedMinutes) {
      disabledMinutes.push(i);
    }
  }
  return disabledMinutes;
}
// eslint-disable-next-line arrow-body-style
const disabledTime = (current: any) => {
  const interval = 30; // 时间间隔（单位：分钟）
  const minutes = dayjs(current)?.minute();
  return {
    disabledMinutes: () => range(0, 60).filter((item) => item % 30 !== 0),
    disabledHours: () =>
      range(0, 24).filter(
        (item) => (item < 8 || item > 17) && (item < 11 || item > 12)
      ),
  };
};

const FormDialog: React.FunctionComponent<IFormDialogProps> = (props) => {
  const {
    stores: originStores,
    feeplans: originFeeplans,
    visible: originVisible,
  } = reservationStore;
  const stores = useRecoilValue(originStores);
  const feeplans = useRecoilValue(originFeeplans);
  const visible = useRecoilValue(originVisible);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [form] = useForm();
  React.useEffect(() => {
    reservationStore.init();
  }, []);

  const onCancel = () => {
    if (_.isFunction(props.onCancel)) props.onCancel?.();
    else reservationStore.updateState?.({ visible: false });
  };
  const storeOptions =
    stores?.map?.((store: any) => ({
      value: store.id,
      label: store.storeName,
    })) || [];
  const feeplanOptions = feeplans?.map?.((feeplan: any) => ({
    value: _.get(feeplan, "id"),
    label: feeplan?.pagetitle + _.get(feeplan, "fee.content"),
  }));
  const isQQEmail = (str: string) => {
    const emails = ["qq.com", "163.com"];
    return emails.includes(str.split("@")?.[1]);
  };
  const getDate = (value: any) =>
    dayjs(new Date(_.get(value, "reservation-date"))).format(
      "YYYY-MM-DD HH:mm:00"
    );
  const getSendData = (value: any) => {
    const storeId = _.get(value, "store-id");
    const selectStore: any = stores.find((store: any) => store.id === storeId);
    return {
      to_name: _.get(value, "customer-name"),
      store_name: _.get(value, "store-name"),
      date: getDate(value),
      feeplan: _.get(value, "feeplan-name")?.join(","),
      address: selectStore.storePath,
      tel: selectStore.tel,
      storeId: selectStore.id,
      to_email: _.get(value, "customer-email"),
    };
  };
  const onSubmit = _.throttle(() => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((value) => {
        if (confirmLoading) {
          message.warning("wait a moment ^ W ^ ~");
          return;
        }
        reservationStore
          .createReservation({
            ...value,
            "reservation-date": getDate(value),
            title:
              _.get(value, "customer-name") +
              " " +
              _.get(value, "customer-tel"),
          })
          .then(() => {
            message.success("予約成功しました!");
            if (_.get(value, "customer-email")) {
              send(
                isQQEmail(_.get(value, "customer-email"))
                  ? "service_cxeivoc"
                  : "service_qg3313l",
                "template_pm2tn4l",
                getSendData(value),
                { publicKey: "QX1ISlC1HuOhDIser" }
              );
            }
            props.onCancel?.();
          })
          .catch(() => {
            message.error(
              "予約が失敗しました。しばらくお待ちいただくか、ページをリフレッシュしてください"
            );
          });
      })
      .catch((err) => {})
      .finally(() => {
        setConfirmLoading(false);
      });
  }, 3000);
  const zIndex = 100110;

  return (
    <Modal
      title="予約フォ一ム"
      open={visible}
      zIndex={100100}
      onCancel={onCancel}
      cancelButtonProps={{
        style: {
          display: "none",
        },
      }}
      okText="予約を確認します"
      onOk={onSubmit}
      className={ModuleScss.dialog}
      confirmLoading={confirmLoading}
    >
      <Form layout="vertical" form={form}>
        <Flex
          vertical={utils.isMobileDevice ? true : false}
          justify="space-between"
        >
          <FormItem name="store-id" label="店铺" rules={[{ required: true }]}>
            <Select
              options={storeOptions}
              dropdownStyle={{
                zIndex: zIndex,
              }}
              onChange={(val, option: any) => {
                form?.setFieldValue("store-name", option.label);
              }}
            />
          </FormItem>
          <FormItem
            name="reservation-date"
            label="予約日時選択"
            tooltip="注意：選択した時間は東京時間基準です！"
            rules={[{ required: true }]}
          >
            <DatePicker
              popupStyle={{
                maxWidth: "100rem",
                position: "fixed",
                left: 0,
                zIndex: 100110,
                top: "20%",
              }}
              popupClassName={ModuleScss.datePicker}
              showTime
              // @ts-ignore
              format={(val: string) => {
                return dayjs(new Date(val)).format("YYYY-MM-DD HH:mm:00");
              }}
              hideDisabledOptions
              showNow={false}
              showSecond={false}
              className={ModuleScss.date}
              disabledDate={disabledDate}
              disabledTime={disabledTime}
              placeholder="予約日時選択"
            />
          </FormItem>
          <FormItem name="store-name" className={ModuleScss.invisible} />
        </Flex>
        <Flex
          vertical={utils.isMobileDevice ? true : false}
          justify="space-between"
        >
          <FormItem
            name="feeplan-id"
            label="プラン"
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              defaultValue={[]}
              dropdownStyle={{
                zIndex: zIndex,
              }}
              options={feeplanOptions}
              onChange={(val, option: any) => {
                form?.setFieldValue(
                  "feeplan-name",
                  option?.map?.(
                    (item: { value: number; label: string }) => item.label
                  ) as string
                );
              }}
            />
          </FormItem>
        </Flex>
        <Flex
          vertical={utils.isMobileDevice ? true : false}
          justify="space-between"
        >
          {/* <FormItem name="extra-purchase">
            <Input></Input>
          </FormItem> */}
          <Flex
            vertical={utils.isMobileDevice ? true : false}
            justify="space-between"
          >
            <FormItem
              name="reservation-people"
              label="予約人数"
              className={ModuleScss.people}
              rules={[
                {
                  required: true,
                },
                // { type: "number", message: "请输入数字" },
              ]}
            >
              <InputNumber className={ModuleScss.peopleNumber} />
            </FormItem>
          </Flex>
          <FormItem
            name="feeplan-name"
            initialValue={[]}
            className={ModuleScss.invisible}
          />
        </Flex>
        <Flex
          vertical={utils.isMobileDevice ? true : false}
          justify="space-between"
        >
          <FormItem
            name="customer-name"
            label="お客様の名前"
            rules={[{ required: true }]}
          >
            <Input />
          </FormItem>
          <FormItem
            name="customer-tel"
            label="電話番号"
            rules={[{ required: true }]}
          >
            <Input />
          </FormItem>
        </Flex>
        <Flex
          vertical={utils.isMobileDevice ? true : false}
          justify="space-between"
        >
          <FormItem
            name="customer-email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "メールの形式が正しくありません",
              },
              { required: true },
            ]}
          >
            <Input type="email" />
          </FormItem>
          <FormItem name="extra-info" label="ご注意事項をお知らせください">
            <Input />
          </FormItem>
        </Flex>
      </Form>
    </Modal>
  );
};

export default FormDialog;
