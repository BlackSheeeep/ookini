import * as React from "react";
import "./SelectArea.scss";
import { cn } from "@bem-react/classname";
import { useLoaderData } from "react-router-dom";
import { Card, Tag } from "antd";
import { selectedArea } from "../..";
import { useRecoilState, useRecoilValue } from "recoil";
import { EnvironmentOutlined } from "@ant-design/icons";
interface ISelectAreaProps {}
const block = cn("select-area");
const SelectArea: React.FunctionComponent<ISelectAreaProps> = (props) => {
  const { homeStore } = useLoaderData();
  const areas = homeStore.areas;
  const [selected, setSelected] = useRecoilState(selectedArea);
  React.useEffect(() => {
    setSelected(areas?.[0]);
  }, [areas]);
  return (
    <Card className={block()}>
      <div>
        <EnvironmentOutlined />
        目的地
      </div>
      {areas.map((area) => (
        <Tag
          onClick={() => area.id != selected?.id && asetSelected(area)}
          key={area.id}
          color={selected?.id == area.id ? "cyan" : ""}
        >
          {area.area_name}
        </Tag>
      ))}
    </Card>
  );
};

export default SelectArea;
