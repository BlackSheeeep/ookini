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
  Steps,
  Button,
  Tag,
} from "antd";
import FormItem from "~/common/components/FormItem";
import ModuleScss from "./Reservation.module.scss";
import dayjs from "dayjs";
import _ from "lodash";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { RangePickerProps } from "antd/lib/date-picker";
import { send } from "@emailjs/browser";
import utils from "~/common/utils";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useLoaderData } from "@remix-run/react";
import { recoilStates } from "..";
import { lodash } from "~/global";
import { wordpressApi } from "~/Request";
dayjs.extend(utc);
dayjs.extend(timezone);
const MAX_STEP = 3;
interface IFormDialogProps {
  visible?: boolean;
  onCancel?: () => void;
}
const useForm = Form.useForm;
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
  const { reservationStore } = useLoaderData();
  const { stores, feeplans } = reservationStore;
  const [visible, setVisible] = useRecoilState(recoilStates.visible);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const forms = new Array(MAX_STEP).fill(true).map(() => useForm()[0]);

  const onCancel = () => {
    if (_.isFunction(props.onCancel)) props.onCancel?.();
    else setVisible(false);
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
      feeplan: _.get(value, "feeplan-name").join(","),
      address: selectStore.storePath,
      tel: selectStore.tel,
      storeId: selectStore.id,
      to_email: _.get(value, "customer-email"),
    };
  };
  const onSubmit = _.throttle(async () => {
    setConfirmLoading(true);
    const values = await Promise.all(
      forms.map((form) => form.validateFields())
    );
    // if (confirmLoading) {
    //   message.warning("wait a moment ^ W ^ ~");
    //   return;
    // }
    const value = values.reduce((pre, item) => {
      return Object.assign(pre, item);
    }, {});
    await wordpressApi
      .createReservation({
        ...value,
        "reservation-date": getDate(value),
        title:
          _.get(value, "customer-name") + " " + _.get(value, "customer-tel"),
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
    setConfirmLoading(false);
  }, 3000);
  const zIndex = 100110;

  return (
    <Modal
      title="予約フォ一ム"
      open={visible}
      zIndex={100100}
      onCancel={onCancel}
      footer={
        <div className={ModuleScss.dialogFooter}>
          <Button
            size="large"
            disabled={current === 0}
            onClick={() => setCurrent(current - 1)}
          >
            前のステップ
          </Button>
          <Button
            size="large"
            type="primary"
            onClick={() =>
              current === MAX_STEP - 1
                ? onSubmit()
                : (async () => {
                    const res = await forms[current].validateFields();
                    res && setCurrent(current + 1);
                  })()
            }
          >
            {current === 2 ? "提出する" : "次のステップ"}
          </Button>
        </div>
      }
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
      <Steps
        size="small"
        direction="horizontal"
        current={current}
        // labelPlacement="vertical"
        onChange={setCurrent}
        items={[
          {
            title: "store info",
            disabled: true,
          },
          {
            disabled: true,
            title: "reservation time",
          },
          {
            disabled: true,
            title: "user info",
          },
        ]}
      />
      <Form
        className={current === 0 ? "" : ModuleScss.invisible}
        layout="vertical"
        form={forms[0]}
      >
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
              maxTagTextLength={10}
              onChange={(val, option: any) => {
                forms[0]?.setFieldValue("store-name", option.label);
              }}
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
              dropdownStyle={{
                zIndex: zIndex,
              }}
              options={feeplanOptions}
              onChange={(val, option: any) => {
                forms[0]?.setFieldValue(
                  "feeplan-name",
                  option?.map?.(
                    (item: { value: number; label: string }) => item.label
                  )
                );
              }}
            />
          </FormItem>
          <FormItem
            name="feeplan-name"
            initialValue={[]}
            className={ModuleScss.invisible}
          />
        </Flex>
      </Form>
      <Form
        className={current === 1 ? "" : ModuleScss.invisible}
        layout="vertical"
        form={forms[1]}
      >
        <Flex
          vertical={utils.isMobileDevice ? true : false}
          justify="space-between"
        >
          {/* <FormItem name="extra-purchase">
            <Input></Input>
          </FormItem> */}
          <FormItem
            name="reservation-date"
            label="予約日時選択"
            tooltip="注意：選択した時間は東京時間基準です！"
            rules={[{ required: true }]}
          >
            <DatePicker
              popupStyle={
                utils.isMobileDevice
                  ? {
                      maxWidth: "100rem",
                      position: "fixed",
                      left: 0,
                      zIndex: 100110,
                      top: "20%",
                    }
                  : {
                      zIndex: 100110,
                    }
              }
              popupClassName={ModuleScss.datePicker}
              showTime
              // @ts-ignore
              format={(val: string) => {
                return dayjs(new Date(val))
                  .format("YYYY-MM-DD HH:mm")
                  .replace(/:[^:]$/gi, "");
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
        </Flex>
      </Form>
      <Form
        className={current === 2 ? "" : ModuleScss.invisible}
        layout="vertical"
        form={forms[2]}
      >
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
