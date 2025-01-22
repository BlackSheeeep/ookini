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
  Card,
  Divider,
  Badge,
} from "antd";
import FormItem from "~/common/components/FormItem";
import dayjs from "dayjs";
import _ from "lodash";
import * as React from "react";
import { RangePickerProps } from "antd/lib/date-picker";
import { send } from "@emailjs/browser";
import utils from "~/common/utils";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useLoaderData } from "@remix-run/react";
import { wordpressApi } from "~/Request";
import CommonImage from "~/common/components/Image";
import axios from "axios";
import Loading from "~/common/components/Loading";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

import Ensure from "./Ensure";
import { useTranslation } from "react-i18next";
dayjs.extend(utc);
dayjs.extend(timezone);
const MAX_STEP = 4;
interface IFormDialogProps {
  visible?: boolean;
  onSuccess?: () => void;
}
const useForm = Form.useForm;

const ReservationForm: React.FunctionComponent<IFormDialogProps> = (props) => {
  const { reservationStore } = useLoaderData();
  const { stores, feeplans } = reservationStore;
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [fetchTimeLoading, setFetchLoading] = React.useState(false);

  const [current, setCurrent] = React.useState(0);

  const { t } = useTranslation("reservation");
  const [selectedDetail, setSelectedDetail] = React.useState<{
    max_reservation: number;
    reservation_time: number;
    reserved_num: number;
    disabled: boolean;
  }>();
  const [reservationDetail, setDetail] = React.useState<
    {
      max_reservation: number;
      reservation_time: number;
      reserved_num: number;
      disabled: boolean;
    }[]
  >();
  const forms = new Array(MAX_STEP).fill(true).map(() => useForm()[0]);

  const feeplanOptions = feeplans?.map?.((feeplan: any) => ({
    value: _.get(feeplan, "id"),
    label: feeplan?.pagetitle + _.get(feeplan, "fee.content"),
  }));
  const isQQEmail = (str: string) => {
    const emails = ["qq.com", "163.com"];
    return emails.includes(str.split("@")?.[1]);
  };
  const getDate = (value: any) =>
    dayjs(
      new Date(
        _.get(value, "reservation_date") +
          " " +
          forms[2]?.getFieldValue("reservation_time")
      )
    ).format("YYYY-MM-DD HH:mm");
  const preDate = React.useRef("");
  const [disabled_date, setDisabled] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const [err, res] = await utils.resolvePromise(
        axios.get("api/res/disabled_date")
      );
      setDisabled(res.data);
    })();
  }, []);
  React.useEffect(() => {
    (async () => {
      const date = forms[1].getFieldValue("reservation_date");
      if (current === 2 && date !== preDate.current) {
        preDate.current = date;
        const storeId = forms[0].getFieldValue("store_id");
        setFetchLoading(true);
        const [err, { data: reservation }] = await utils.resolvePromise(
          axios.get(
            `${process.env.VITE_API_URL}/api/res/detail?date=${date}&store_id=${storeId}`
          )
        );
        setFetchLoading(false);
        if (err) {
          message.error("something wrong");
          return;
        }
        setDetail(reservation);
      }
    })();
  }, [current]);
  const getSendData = (value: any) => {
    const storeId = _.get(value, "store_id");
    const selectStore: any = stores.find((store: any) => store.id === storeId);
    return {
      to_name: _.get(value, "customer_name"),
      store_name: _.get(value, "store_name"),
      date: getDate(value),
      feeplan: _.get(value, "fee_planning_name"),
      address: selectStore.storePath,
      tel: selectStore.tel,
      storeId: selectStore.id,
      to_email: _.get(value, "customer_email"),
    };
  };
  const allForm = forms
    .map((form) => form.getFieldsValue(true))
    .reduce((pre, item) => {
      item = _.omit(item, "reservation_time") || {};
      return Object.assign(pre, item);
    }, {});
  const onSubmit = _.throttle(async () => {
    setConfirmLoading(true);
    if (confirmLoading) return;
    const values = await Promise.all(
      forms.map((form) => form.validateFields())
    );
    if (!values.every((item) => item)) {
      setConfirmLoading(false);
      message.warning("未入力の情報があります");
      return;
    }

    // if (confirmLoading) {
    //   message.warning("wait a moment ^ W ^ ~");
    //   return;
    // }
    const value = values.reduce((pre, item) => {
      item = _.omit(item, "reservation_time") || {};
      return Object.assign(pre, item);
    }, {});
    await wordpressApi
      .createReservation({
        ...value,
        reservation_date: getDate(value),
        title:
          _.get(value, "customer_name") + " " + _.get(value, "customer_tel"),
      })
      .then(async () => {
        message.success("予約成功しました!");
        if (_.get(value, "customer_email")) {
          await send(
            isQQEmail(_.get(value, "customer_email"))
              ? "service_cxeivoc"
              : "service_qg3313l",
            "template_pm2tn4l",
            getSendData(value),
            { publicKey: "QX1ISlC1HuOhDIser" }
          );
        }
      })
      .catch((e) => {
        console.log(e);
        message.error(
          "予約が失敗しました。しばらくお待ちいただくか、ページをリフレッシュしてください"
        );
      });
    setConfirmLoading(false);
  }, 3000);
  const zIndex = 100110;
  // 获取当前日期
  const today = dayjs().startOf("day");

  // 禁用今天之前的日期
  const disabledDate = (current) => {
    const date = current.format("YYYY-MM-DD") || "";
    if (disabled_date.includes(date as string)) return true;
    // 如果 current 是今天或之前的日期，则禁用
    return current && current < today;
  };
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
          <ArrowLeftOutlined />
          前のステップ
        </Button>
        <Button
          size="large"
          type="primary"
          loading={confirmLoading}
          onClick={() =>
            current === forms.length
              ? onSubmit()
              : (async () => {
                  const [err, res] = await utils.resolvePromise(
                    forms[current].validateFields()
                  );
                  if (!res) {
                    message.error("请选择！");
                  }
                  res && setCurrent(current + 1);
                })()
          }
        >
          {current === forms.length - 1 ? "提出する" : "次のステップ"}
          <ArrowRightOutlined />
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
        <Card>
          <Flex
            vertical={utils.isMobileDevice ? true : false}
            justify="space-between"
          >
            <FormItem
              name="store_id"
              label="店铺选择"
              rules={[{ required: true }]}
            >
              {/* <Select
              options={storeOptions}
              dropdownStyle={{
                zIndex: zIndex,
              }}
              maxTagTextLength={10}
              onChange={(val, option: any) => {
                forms[0]?.setFieldValue("store_name", option.label);
              }}
            /> */}
            </FormItem>
            <Checkbox.Group
              onChange={(checkedValue) => {
                forms[0]?.setFieldValue("store_id", checkedValue[0]);
              }}
            >
              {stores.map((store) => {
                return (
                  <Checkbox
                    key={store.id}
                    value={store.id}
                    onClick={() => {
                      forms[0]?.setFieldValue("store_name", store.storeName);
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
            <FormItem
              name="store_name"
              className={"reservation__form--hidden"}
            />
          </Flex>
        </Card>
      </Form>
      <Form
        className={current === 1 ? "" : "reservation__form--hidden"}
        form={forms[1]}
      >
        <Card title={<h2>{forms[0].getFieldValue("store_name")}の预约</h2>}>
          <Flex vertical justify="flex-start">
            <FormItem
              name="reservation_date"
              label="予約日時選択"
              tooltip="注意：選択した時間は東京時間基準です！"
              rules={[{ required: true }]}
            >
              <div>
                <Calendar
                  disabledDate={disabledDate}
                  onSelect={(date, { source }) => {
                    if (source !== "date") return;
                    forms[1].setFieldValue(
                      "reservation_date",
                      date.format("YYYY-MM-DD")
                    );
                    setCurrent(current + 1);
                  }}
                />
              </div>
            </FormItem>
          </Flex>
        </Card>
      </Form>
      <Form
        layout="vertical"
        className={current === 2 ? "" : "reservation__form--hidden"}
        form={forms[2]}
      >
        <Card
          title={
            <Flex vertical justify="center" align="center">
              <h2>{forms[0]?.getFieldValue?.("store_name")}の预约&nbsp;</h2>
              <h3 style={{ margin: 0 }}>
                {forms[1]?.getFieldValue?.("reservation_date")}
              </h3>
            </Flex>
          }
        >
          <FormItem
            className="reservation__form--hidden"
            rules={[
              {
                required: true,
                message: "请选择！",
              },
            ]}
            name="reservation_time"
          />
          <Flex
            vertical
            gap={8}
            align="center"
            className="reservation__time-picker"
            justify="center"
          >
            {reservationDetail && !fetchTimeLoading ? (
              reservationDetail.map((item) => {
                return (
                  <Flex
                    key={item.reservation_time}
                    vertical={false}
                    align="center"
                    justify="center"
                  >
                    <Button className="reservation__time-button">
                      {item.reservation_time}
                    </Button>
                    <Button
                      onClick={() => {
                        forms[2].setFieldValue(
                          "reservation_time",
                          item.reservation_time
                        );
                        setTimeout(() => {
                          setSelectedDetail(item);
                          setCurrent(current + 1);
                        }, 300);
                      }}
                      disabled={
                        item.disabled ||
                        item.max_reservation - item.reserved_num <= 0
                      }
                      className="reservation__left-num"
                    >
                      {item.max_reservation - item.reserved_num
                        ? `剩余${item.max_reservation - item.reserved_num}人`
                        : ``}
                    </Button>
                  </Flex>
                );
              })
            ) : (
              <Loading></Loading>
            )}
          </Flex>
        </Card>
      </Form>
      <Form
        className={current === 3 ? "" : "reservation__form--hidden"}
        layout="vertical"
        form={forms[3]}
      >
        <Card title={<h2>{t("reservationInfo")}</h2>}>
          <FormItem label="预约日期" required>
            <span
              style={{
                fontSize: 18,
              }}
            >
              {forms[1].getFieldValue("reservation_date")}&nbsp;
              {selectedDetail?.reservation_time
                .toString()
                ?.replace(/:00$/, "") || ""}
            </span>
          </FormItem>
          <Divider></Divider>
          <FormItem
            name="reservation_people"
            label={t("customerNumber")}
            className={"reservation__people"}
            initialValue={1}
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
                    forms[3].setFieldValue(
                      "reservation_people",
                      Math.max(
                        forms[3].getFieldValue("reservation_people") - 1,
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
                    forms[3].setFieldValue(
                      "reservation_people",
                      Math.min(forms[3].getFieldValue("reservation_people") + 1)
                    );
                  }}
                >
                  +
                </div>
              }
              className={"reservation__peopleNumber"}
            />
          </FormItem>
        </Card>
        <Divider></Divider>
        <Card title={<h2>{t("customerInfo")}</h2>}>
          <Flex
            vertical={utils.isMobileDevice ? true : false}
            justify="space-between"
          >
            <FormItem
              name="customer_name"
              label={t("customerName")}
              rules={[{ required: true }]}
            >
              <Input />
            </FormItem>
            <FormItem
              name="customer_tel"
              label="電話番号"
              rules={[{ required: true }]}
            >
              <Input />
            </FormItem>
            <FormItem
              name="customer_email"
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
          </Flex>
        </Card>
        <Divider></Divider>
        <Card title={<h2>{t("planDetail")}</h2>}>
          <Flex vertical className="">
            <span dangerouslySetInnerHTML={{ __html: t("planTips") }}></span>
          </Flex>
          <Flex
            vertical={utils.isMobileDevice ? true : false}
            justify="space-between"
          >
            <FormItem
              name="fee_planning_name"
              initialValue={[]}
              className={"reservation__form--hidden"}
            />
            <FormItem
              name="fee_planning_id"
              label="プラン"
              rules={[{ required: true }]}
            >
              <Select
                dropdownStyle={{
                  zIndex: zIndex,
                }}
                options={feeplanOptions}
                //@ts-ignore-next-line
                onChange={(val, option: { value: number; label: string }) => {
                  forms[3]?.setFieldValue(
                    "fee_planning_name",
                    option.label || ""
                  );
                }}
              />
            </FormItem>

            <FormItem name="extra_info" label="ご注意事項をお知らせください">
              <Input />
            </FormItem>
          </Flex>
        </Card>
      </Form>
      {current === forms?.length ? <Ensure {...allForm}></Ensure> : null}
    </div>
  );
};
export default ReservationForm;
