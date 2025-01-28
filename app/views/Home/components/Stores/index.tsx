import {
  Card,
  Flex,
  Typography,
  Collapse,
  Divider,
  Button,
  Popover,
} from "antd";
import _ from "lodash";
import { HOME_KEYS } from "~/common/constants/config";
import * as React from "react";
import StoresScss from "./Stores.module.scss";
import utils from "~/common/utils";
import CommonTitle from "~/common/components/CommonTitle";
import CommonImage from "~/common/components/Image";
import Loading from "~/common/components/Loading";
import { useLoaderData } from "@remix-run/react";
import { HomeLoader } from "~/routes/_index";
import StoreCard from "~/common/components/StoreCard";
import { useRecoilValue } from "recoil";
import { selectedArea } from "../..";

interface IStoresProps {}

const Stores: React.FunctionComponent<IStoresProps> = (props) => {
  const storesId = HOME_KEYS.storeList;
  const {
    homeStore: { stores },
  } = useLoaderData<HomeLoader>();
  const internalStores = stores;
  const selected = useRecoilValue(selectedArea);
  return (
    <Flex
      id={storesId}
      vertical
      align="center"
      className={StoresScss.container}
    >
      <CommonTitle
        level={4}
        title={`ookini着物${selected?.area_name}の店舗`}
        subTitle="Store Information"
        style={{ marginBottom: "2rem" }}
      />
      {_.isEmpty(internalStores) ? (
        <Loading></Loading>
      ) : (
        <Flex
          justify="space-between"
          vertical={utils.isMobileDevice ? true : false}
          className={StoresScss.storeContainer}
        >
          {internalStores
            .filter((store) => store.area[0]?.id == selected?.id)
            .map?.((storeInfo: Record<string, any>, id: number) => {
              if (!storeInfo) return null;
              return <StoreCard storeInfo={storeInfo} />;
            })}
        </Flex>
      )}
    </Flex>
  );
};

export default Stores;
