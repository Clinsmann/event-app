import React from "react";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import TimePicker from "react-time-picker";
import { Controller, FormState, UseFormMethods } from "react-hook-form";

type IProps = Partial<UseFormMethods> &
  FormFieldProps & {
    name: string;
    formState: FormState<any>;
  };

export const MyTimePicker: React.FC<IProps> = ({ width, name, control, formState, ...rest }) => {
  return (
    <Form.Field error={formState.touched[name] && formState.errors[name]} width={width}>
      <Controller as={TimePicker} control={control} name={name} {...rest} />
      {formState.touched[name] && formState.errors[name] && (
        <Label basic color="red">
          {formState.errors[name].message}
        </Label>
      )}
    </Form.Field>
  );
};
