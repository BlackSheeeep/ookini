import * as React from "react";
import ModuleScss from "./FAQ.module.scss";
import { Collapse, Flex, Typography } from "antd";
import { HOME_KEYS } from "~/common/constants/config";
import homeStore from "~/views/Home/store";
import Loading from "~/common/components/Loading";
import { useRecoilValue } from "recoil";
import CommonTitle from "~/common/components/CommonTitle";
interface IFQAProps {}
const FQAId = HOME_KEYS.AskAndQuestion;
const FAQ: React.FunctionComponent<IFQAProps> = (props) => {
  const { faq } = homeStore;
  React.useEffect(() => {
    homeStore.getFAQ();
  }, []);
  const faqs = useRecoilValue(faq);
  return (
    <Flex id={FQAId} vertical align="center" className={ModuleScss.container}>
      <CommonTitle
        level={4}
        title={"よくある質問"}
        subTitle="About Kimono Rental"
      />
      {_.isEmpty(faqs) ? (
        <Loading></Loading>
      ) : (
        <Collapse
          className={ModuleScss.collapse}
          items={faqs?.map?.(
            (item: { question: string; answer: string }, index: number) => ({
              key: index,
              label: item.question,
              children: item.answer,
            })
          )}
        />
      )}
    </Flex>
  );
};

export default FAQ;
