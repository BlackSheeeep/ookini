import {
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  message,
  Steps,
  Button,
  Checkbox,
  Calendar,
} from "antd";
import FormItem from "~/common/components/FormItem";
import dayjs from "dayjs";
import _ from "lodash";
import * as React from "react";
import { useRecoilState } from "recoil";
import { RangePickerProps } from "antd/lib/date-picker";
import { send } from "@emailjs/browser";
import utils from "~/common/utils";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useLoaderData } from "@remix-run/react";
import { wordpressApi } from "~/Request";
import CommonImage from "~/common/components/Image";
dayjs.extend(utc);
dayjs.extend(timezone);
const MAX_STEP = 4;
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

const ReservationForm: React.FunctionComponent<IFormDialogProps> = (props) => {
  const { reservationStore } = useLoaderData();
  const { stores, feeplans } = reservationStore;
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const forms = new Array(MAX_STEP).fill(true).map(() => useForm()[0]);

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
    <div
      className="reservation"
      // title="予約フォ一ム"
      // okText="予約を確認します"
      // onOk={onSubmit}
    >
      <div className={"reservation__footer"}>
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
          loading={confirmLoading}
          onClick={() =>
            current === forms.length - 1
              ? onSubmit()
              : (async () => {
                  const res = await forms[current].validateFields();
                  res && setCurrent(current + 1);
                })()
          }
        >
          {current === forms.length - 1 ? "提出する" : "次のステップ"}
        </Button>
      </div>
      <Steps
        size="small"
        className="reservation__steps"
        direction="horizontal"
        current={current}
        labelPlacement="vertical"
        onChange={setCurrent}
        items={[
          {
            title: "选择店铺",
            disabled: true,
          },
          {
            disabled: true,
            title: "预约日期",
          },
          {
            disabled: true,
            title: "预约时间",
          },
          {
            disabled: true,
            title: "填写用户信息",
          },
        ]}
      />

      <Form
        className={current === 0 ? "" : "reservation__form--hidden"}
        layout="vertical"
        form={forms[0]}
      >
        <Flex
          vertical={utils.isMobileDevice ? true : false}
          justify="space-between"
        >
          <FormItem name="store-id" label="店铺" rules={[{ required: true }]}>
            {/* <Select
              options={storeOptions}
              dropdownStyle={{
                zIndex: zIndex,
              }}
              maxTagTextLength={10}
              onChange={(val, option: any) => {
                forms[0]?.setFieldValue("store-name", option.label);
              }}
            /> */}
            <Checkbox.Group>
              {stores.map((store) => {
                return (
                  <Checkbox
                    value={store.id}
                    onClick={() => {
                      forms[0]?.setFieldValue("store-name", store.storeName);
                      setCurrent(current + 1);
                    }}
                    className="reservation__check-store"
                  >
                    <div className="reservation__check-inner">
                      {store.storeImage ? (
                        <CommonImage
                          preview={false}
                          width={100}
                          height={100}
                          style={{
                            borderRadius: 8,
                            width: 100,
                            height: 100,
                          }}
                          src={store.storeImage}
                        />
                      ) : (
                        <div
                          style={{
                            width: 100,
                            height: 100,
                          }}
                        ></div>
                      )}

                      <span className="reservation__store-name">
                        {store.storeName}
                      </span>
                    </div>
                  </Checkbox>
                );
              })}
            </Checkbox.Group>
          </FormItem>

          <FormItem name="store-name" className={"reservation__form--hidden"} />
        </Flex>
      </Form>
      <Form
        className={current === 1 ? "" : "reservation__form--hidden"}
        form={forms[1]}
      >
        <h2>{forms[0].getFieldValue("store-name")}の预约</h2>
        <Flex vertical justify="flex-start">
          <FormItem
            name="reservation-date"
            label="予約日時選択"
            tooltip="注意：選択した時間は東京時間基準です！"
            rules={[{ required: true }]}
          >
            <div>
              <Calendar
                onChange={(date) => {
                  forms[1].setFieldValue(
                    "reservation-date",
                    date.format("YYYY-MM-DD")
                  );
                  setCurrent(current + 1);
                }}
              />
            </div>

            {/* <DatePicker
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
              popupClassName={"reservation__date-picker"}
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
              className={"reservation__date"}
              disabledDate={disabledDate}
              disabledTime={disabledTime}
              placeholder="予約日時選択"
            /> */}
          </FormItem>
        </Flex>
      </Form>
      <Form
        layout="vertical"
        className={current === 2 ? "" : "reservation__form--hidden"}
        form={forms[2]}
      >
        <Flex vertical justify="center" align="center">
          <h2>{forms[0]?.getFieldValue?.("store-name")}の预约&nbsp;</h2>
          <h3 style={{ margin: 0 }}>
            {forms[1]?.getFieldValue?.("reservation-date")}
          </h3>
        </Flex>
      </Form>
      <Form
        className={current === 3 ? "" : "reservation__form--hidden"}
        layout="vertical"
        form={forms[3]}
      >
        <Flex
          vertical={utils.isMobileDevice ? true : false}
          justify="space-between"
        >
          <FormItem
            name="reservation-people"
            label="予約人数"
            className={"reservation__people"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              readOnly
              addonBefore={
                <div
                  className={"reservation__addon"}
                  onClick={() => {
                    forms[1].setFieldValue(
                      "reservation-people",
                      Math.max(
                        forms[1].getFieldValue("reservation-people") - 1,
                        1
                      )
                    );
                  }}
                >
                  -
                </div>
              }
              addonAfter={
                <div
                  className={"reservation__addon"}
                  onClick={() => {
                    forms[1].setFieldValue(
                      "reservation-people",
                      Math.min(
                        forms[1].getFieldValue("reservation-people") + 1,
                        30
                      )
                    );
                  }}
                >
                  +
                </div>
              }
              className={"reservation__peopleNumber"}
            />
          </FormItem>
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
                forms[1]?.setFieldValue(
                  "reservation-people",
                  option?.length || 0
                );
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
            className={"reservation__form--hidden"}
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
    </div>
  );
};
export default ReservationForm;
