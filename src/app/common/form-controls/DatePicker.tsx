import React from "react";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { Controller, FormState, UseFormMethods } from "react-hook-form";
import DatePicker from "react-date-picker";

type IProps = Partial<UseFormMethods> &
  FormFieldProps & {
    name: string;
    formState: FormState<any>;
  };

export const MyDatePicker: React.FC<IProps> = ({ width, name, control, formState, ...rest }) => {
  return (
    <Form.Field error={formState.touched[name] && formState.errors[name]} width={width}>
      <Controller as={DatePicker} control={control} name={name} {...rest} />
      {formState.touched[name] && formState.errors[name] && (
        <Label basic color="red">
          {formState.errors[name].message}
        </Label>
      )}
    </Form.Field>
  );
};
