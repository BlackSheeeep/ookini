import * as React from "react";
import ModuleScss from "./FAQ.module.scss";
import { Collapse, Flex, Typography } from "antd";
import { HOME_KEYS } from "~/common/constants/config";
import homeStore from "~/views/Home/store";
import Loading from "~/common/components/Loading";
import CommonTitle from "~/common/components/CommonTitle";
import _ from "lodash";

interface IFQAProps {}
const FQAId = HOME_KEYS.AskAndQuestion;
const FAQ: React.FunctionComponent<IFQAProps> = (props) => {
  const [faqs, setFaqs] = React.useState([]);
  React.useLayoutEffect(() => {
    async function fetch() {
      const res = await homeStore.getFAQ();
      setFaqs(res);
    }
    fetch();
  }, []);
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
