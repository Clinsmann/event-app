import React from "react";
import { UseFormMethods, FormState } from "react-hook-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

type IProps = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> &
  Partial<UseFormMethods> &
  FormFieldProps & {
    name: string;
    register: () => any;
    formState: FormState<any>;
  };

export const TextAreaInput: React.FC<IProps> = ({ input, name, width, rows, placeholder, register, formState }) => {
  return (
    <Form.Field error={formState.touched[name] && formState.errors[name]} width={width}>
      <textarea name={name} rows={rows} {...input} placeholder={placeholder} ref={register} />
      {formState.touched[name] && formState.errors[name] && (
        <Label basic color="red">
          {formState.errors[name].message}
        </Label>
      )}
    </Form.Field>
  );
};
