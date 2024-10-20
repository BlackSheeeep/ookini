import { Card, Collapse, Divider, Flex, Steps } from "antd";
import * as React from "react";
import { Typography } from "antd";
import RentStepScss from "./RentStep.module.scss";
import homeStore from "~/views/Home/store";
import { useRecoilValue } from "recoil";
import { HOME_KEYS } from "~/common/constants/config";
import Loading from "~/common/components/Loading";
import CommonTitle from "~/common/components/CommonTitle";
import utils from "~/common/utils";
import CommonImage from "~/common/components/Image";
import { CaretRightOutlined } from "@ant-design/icons";
import _ from "lodash";

interface IRentStepsProps {}
const stepsId = HOME_KEYS.kimonoRentalSteps;
const steps = [
  {
    title: "お電話・Webにてご予約",
    description: "",
    detail: "お電話かご予約フォームよりご予約下さい。",
    image:
      "https://api.address-ookini.com/wp-content/uploads/2024/01/1692263807445373.png",
  },
  {
    title: "ご来店",
    description: "",
    detail:
      "ご予約頂いた日時にご来店下さい。店舗の詳しい場所はアクセスをご覧下さい。プランの当日変更も可能ですので、実際にご覧いただいてお選びください。",
    image:
      "https://api.address-ookini.com/wp-content/uploads/2024/01/1685004207678178.png",
  },
  {
    title: "着物選び",
    detail:
      "様々な種類の着物をご用意しております。かわいい系、かっこいい系、モダン系、アンティーク系など、上質な着物を取り揃えております。また、帯や小物の種類も豊富で、様々なコーディネートを楽しめます。",
    description: "",
    image:
      "https://api.address-ookini.com/wp-content/uploads/2024/01/1685073704127642.png",
  },
  {
    title: "着付け",
    description: "",
    detail:
      "プロの着付け師がお客様の着物を丁寧に着せてくれるため、着くずれの心配もありません。着物の着付けは、繊細で複雑な作業であり、正確な技術と経験が必要です。私たちの着付け師は、豊富な経験と専門知識を持っており、お客様の身体に合わせた適切な着付けを行います。",
    image:
      "https://api.address-ookini.com/wp-content/uploads/2024/01/1685073494164568.jpeg",
  },
  {
    title: "オプション",
    detail:
      "私たちの美容師は豊富な経験を持ち、髪の長さやスタイルに合わせた最適なセットを提供します。また、髪にボリュームやウェーブを与え、より華やかな雰囲気を演出します。さらに、髪飾りも多種多様に取り揃えています。髪飾りは、着物のアクセントとなり、より一層の美しさを引き立てます。",
    description: "",
    image:
      "https://api.address-ookini.com/wp-content/uploads/2024/01/1685072772777058.png",
  },
  {
    title: "完成・着物で散策",
    detail:
      "あっという間に完成\n清水寺・祇園・高台寺・八坂神社・伏見稲荷へ徒歩で散策していただけます。少し足を延ばせば嵐山へも散策可能です！",
    description: "",
    image:
      "https://api.address-ookini.com/wp-content/uploads/2024/01/1685072877887903.png",
  },
  {
    title: "着物返却",
    detail:
      "最終返却時間までに着物のご返却をお願いします。翌日返却を利用する時は事前にご連絡してください。",
    description: "",
    image:
      "https://api.address-ookini.com/wp-content/uploads/2024/01/1685073001146958.png",
  },
];
const RentSteps: React.FunctionComponent<IRentStepsProps> = (props) => {
  const { stores } = homeStore;
  const storeInfo = useRecoilValue(stores);
  const [current, setCurrent] = React.useState(0);

  const infos = storeInfo.map((item: any) => ({
    storeName: item.storeName,
    tel: item?.tel,
    address: item?.storePath,
  }));

  const images = steps.map((item) => item.image);

  const onChange = (val: number) => {
    setCurrent(val);
  };
  return (
    <Flex
      id={stepsId}
      align="center"
      vertical
      className={`${RentStepScss.container} ${
        utils.isMobileDevice ? RentStepScss.mobileContainer : ""
      }`}
    >
      <CommonTitle
        level={4}
        title="着物レンタルの流れ"
        subTitle={
          "京都は、着物が似合う街です。一日レンタルしてみませんか？初めて着物レンタルをご利用するお客様でも安心してご利用いただけるよう、レンタルの流れを解説します。"
        }
      />
      {_.isEmpty(steps) ? (
        <Loading></Loading>
      ) : (
        <Steps
          current={current}
          onChange={onChange}
          labelPlacement="vertical"
          items={steps.map(
            (item: { title: string; detail: string; image: string }) => ({
              description: utils.isMobileDevice ? "" : item.detail,
              title: utils.isMobileDevice ? (
                <Collapse
                  bordered={false}
                  items={[
                    {
                      label: item.title,
                      children: (
                        <>
                          <Flex
                            vertical
                            className={RentStepScss.detailContainer}
                          >
                            <Flex
                              className={utils.uniteClass(
                                "common-img",
                                RentStepScss.imgWrapper
                              )}
                            >
                              <CommonImage
                                className={RentStepScss.img}
                                src={item.image}
                              />
                            </Flex>

                            <Typography.Text
                              mark
                              className={RentStepScss.detail}
                            >
                              {item.detail}
                            </Typography.Text>
                          </Flex>
                        </>
                      ),
                    },
                  ]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                />
              ) : (
                item.title
              ),
            })
          )}
        />
      )}
      <Flex
        className={RentStepScss.card}
        vertical={utils.isMobileDevice ? true : false}
        align="start"
      >
        {utils.isMobileDevice ? null : (
          <Flex vertical className={RentStepScss.detailContainer}>
            <Flex
              className={utils.uniteClass(
                "common-img",
                RentStepScss.imgWrapper
              )}
            >
              <CommonImage
                className={RentStepScss.img}
                src={images[current] as string}
              />
            </Flex>

            <Typography.Text mark className={RentStepScss.detail}>
              {steps[current].detail}
            </Typography.Text>
          </Flex>
        )}
        <Flex
          wrap="wrap"
          vertical={utils.isMobileDevice ? true : false}
          className={RentStepScss.desc}
        >
          {infos?.map?.((store, index) => (
            <Typography.Text
              key={index}
              type="secondary"
              style={{ margin: 0, marginBottom: "2rem" }}
            >
              {store.storeName}
              <br></br>
              {store.tel}
              <br></br>
              {store.address}
            </Typography.Text>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RentSteps;
