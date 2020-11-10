import React, { FC } from "react";
import { Controller, FormState, UseFormMethods } from "react-hook-form";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import Form from "semantic-ui-react/dist/commonjs/collections/Form/Form";
import { FormFieldProps } from "semantic-ui-react/dist/commonjs/collections/Form/FormField";
import Label from "semantic-ui-react/dist/commonjs/elements/Label/Label";

type IProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  NumberFormatProps &
  FormFieldProps &
  Partial<UseFormMethods> & {
    label: string;
    name: string;
    formState: FormState<any>;
  };

//can be use for password, numbers, amount, phone, credit card and any other format...reference documentation for more details
//https://www.npmjs.com/package/react-number-format
export const InputFormatter: FC<IProps> = ({
  width,
  label,
  name,
  control,
  formState,
  type,
  thousandSeparator,
  decimalSeparator,
  allowNegative,
  prefix,
  suffix,
  format,
  mask,
  allowEmptyFormatting,
  decimalScale,
  isNumericString,
}) => {
  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {label}
      </label>

      <Form.Field error={formState.touched[name] && formState.errors[name]} width={width}>
        <Controller
          as={NumberFormat}
          type={type}
          control={control}
          name={name}
          thousandSeparator={thousandSeparator}
          decimalSeparator={decimalSeparator}
          allowNegative={allowNegative}
          prefix={prefix}
          suffix={suffix}
          format={format}
          mask={mask}
          decimalScale={decimalScale}
          allowEmptyFormatting={allowEmptyFormatting}
          isNumericString={isNumericString}
        />
        {formState.touched[name] && formState.errors[name] && (
          <Label basic color="red">
            {formState.errors[name].message}
          </Label>
        )}
      </Form.Field>
    </div>
  );
};
