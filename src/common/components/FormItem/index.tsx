import { Form } from "antd";
import FormItem, { FormItemProps } from "antd/es/form/FormItem";
import * as React from "react";

interface IFormItemProps extends FormItemProps {
  children?: React.ReactNode;
}

const MyFormItem: React.FunctionComponent<IFormItemProps> = (props) => {
  const { rules, ...restProps } = props;
  const [validateStatus, setValidateStatus] = React.useState<
    "" | "success" | "error"
  >("");
  const newRules =
    rules?.map?.((item: any) => {
      if (_.get(item, "required")) {
        item.message = (props.label || props.name || "") + "を入力してください";
      }
      if (_.get(item, "number")) {
        item.validator = (val: any) => {
          const temp = _.toNumber(val);
          return temp && _.isNumber(temp);
        };
      }
      return item;
    }) || [];
  return (
    <Form.Item
      rules={newRules}
      validateStatus={validateStatus}
      shouldUpdate={(prev, next, info) => {
        const error = newRules.some((item) => {
          if (_.isFunction(item.validator)) {
            return !item.validator?.(next);
          }
          return false;
        });
        setValidateStatus(error ? "error" : "success");
        return _.isFunction(restProps?.shouldUpdate)
          ? !!restProps?.shouldUpdate?.(prev, next, info)
          : !!restProps?.shouldUpdate;
      }}
      {...restProps}
    >
      {props.children}
    </Form.Item>
  );
};

export default MyFormItem;
