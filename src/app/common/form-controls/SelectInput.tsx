import React from "react";
import { Controller, FormState, UseFormMethods } from "react-hook-form";
import ReactSelect, { CommonProps } from "react-select";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

type IProps = Partial<CommonProps<any>> &
  Partial<UseFormMethods> &
  FormFieldProps & {
    name: string;
    placeholder?: string;
    isSearchable?: boolean;
    isClearable?: boolean;
    formState: FormState<any>;
  };

export const SelectInput: React.FC<IProps> = ({
  width,
  name,
  isSearchable,
  isClearable,
  control,
  register,
  formState,
  placeholder,
  options,
  isMulti,
  ...rest
}) => {
  return (
    <Form.Field error={formState.touched[name] && formState.errors[name]} width={width}>
      <Controller
        as={ReactSelect}
        control={control}
        name={name}
        placeholder={placeholder}
        options={options}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={isSearchable}
        {...rest}
      />
      {formState.touched[name] && formState.errors[name] && (
        <Label basic color="red">
          {formState.errors[name].message}
        </Label>
      )}
    </Form.Field>
  );
};
