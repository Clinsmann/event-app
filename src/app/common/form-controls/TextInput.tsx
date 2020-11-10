import React from "react";
import { FormState, UseFormMethods } from "react-hook-form/dist/types/form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

type IProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  Partial<UseFormMethods> &
  FormFieldProps & {
    name: string;
    type?: "text" | "password" | "email" | "number";
    register: () => any;
    formState: FormState<any>;
  };

export const TextInput: React.FC<IProps> = ({ width, name, type = "text", placeholder, register, formState }) => {
  return (
    <Form.Field error={!!formState.touched[name] && !!formState.errors[name]} width={width}>
      <input name={name} id={name} type={type} ref={register} placeholder={placeholder} />
      {formState.touched[name] && formState.errors[name] && (
        <Label basic color="red">
          {formState.errors[name].message}
        </Label>
      )}
    </Form.Field>
  );
};
