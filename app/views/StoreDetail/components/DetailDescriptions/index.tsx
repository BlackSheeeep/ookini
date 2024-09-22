import * as React from "react";
import { Descriptions, List } from "antd";
import type { DescriptionsProps } from 'antd';
interface IDetailDescriptionsProps {
  storeDetail: any
}

const DetailDescriptions: React.FunctionComponent<IDetailDescriptionsProps> = (props) => {
  const { storeDetail } = props;
  if (!storeDetail) {
    return null;
  }

  const  { runTime, tel, locate, road } = storeDetail;

  const descriptionsItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '営業時間',
      children: (
        <div>
          <div>{runTime?.range}</div>
          <div>{runTime?.day}</div>
        </div>
      ),
    },
    {
      key: '2',
      label: '電話番号',
      children: `Tel. ${tel}`,
    },
    {
      key: '3',
      label: '店舗住所',
      children: (
        <div>
          <div>{locate?.number}</div>
          <div>{locate?.position}</div>
        </div>
      ),
    },
    {
      key: '4',
      label: 'アクセス',
      children: `${road?.content}`,
    },
    // {
    //   key: '5',
    //   label: '地图',
    //   children: 'empty',
    // },
  ];

  return (
    <div className="detailDescriptions">
      <Descriptions
        size="middle"
        column={1}
        items={descriptionsItems}
        style={{ marginTop: '2rem' }}
      />
    </div>
  );
};

export default React.memo(DetailDescriptions);
