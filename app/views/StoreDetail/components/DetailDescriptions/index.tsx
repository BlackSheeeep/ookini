import * as React from "react";
import { Descriptions, List } from "antd";
import type { DescriptionsProps } from "antd";
interface IDetailDescriptionsProps {
  storeDetail: any;
}

const DetailDescriptions: React.FunctionComponent<IDetailDescriptionsProps> = (
  props
) => {
  const { storeDetail } = props;
  if (!storeDetail) {
    return null;
  }

  const { business_from, store_address, business_to, tel, address_content } =
    storeDetail;

  const descriptionsItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "営業時間",
      children: (
        <div>
          <div>
            {business_from} - {business_to}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "電話番号",
      children: `Tel. ${tel}`,
    },
    {
      key: "3",
      label: "店舗住所",
      children: (
        <div>
          <div>{store_address}</div>
        </div>
      ),
    },
    {
      key: "4",
      label: "アクセス",
      children: `${address_content}`,
    },
    // {
    //   key: '5',
    //   label: '地图',
    //   children: 'empty',
    // },
  ];

  return (
    <div
      style={{
        borderTopLeftRadius: 0,
        marginTop: 0,
        padding: 20,
        borderTopRightRadius: 0,
      }}
      className="detailDescriptions"
    >
      <Descriptions
        size="middle"
        column={1}
        layout="vertical"
        items={descriptionsItems}
        style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      />
    </div>
  );
};

export default React.memo(DetailDescriptions);
