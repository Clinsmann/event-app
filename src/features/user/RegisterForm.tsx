import React, { useContext, useState } from "react";
import { Form, Button, Header } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosResponse } from "axios";
import ErrorMessage from "../../app/common/ErrorMessage";
import { TextInput } from "../../app/common/form-controls";
import { IUserFormValues } from "../../app/common/models/user";
import { RootStoreContext } from "../../app/store/rootStore";
import { useLocation } from "react-router-dom";
import { RedirectTo } from "../../app/layout/RedirectTo";

const schema = yup.object().shape({
  username: yup.string().required(),
  displayName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const RegisterForm = () => {
  const location = useLocation();
  const rootStore = useContext(RootStoreContext);
  const { registerUser } = rootStore.userStore;
  const [apiError, setApiError] = useState<AxiosResponse>();

  const { register, handleSubmit, formState } = useForm<IUserFormValues>({
    mode: "onBlur", //onChange
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IUserFormValues) =>
    registerUser(data)
      .then(() => RedirectTo(location))
      .catch((error: AxiosResponse) => setApiError(error));

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Header as="h2" content="Sign up to Reactivities" color="teal" textAlign="center" />
      <TextInput name="username" placeholder="Username" register={register} formState={formState} />
      <TextInput name="displayName" placeholder="Display Name" register={register} formState={formState} />
      <TextInput name="email" type="email" placeholder="Email" register={register} formState={formState} />
      <TextInput name="password" type="password" placeholder="Password" register={register} formState={formState} />
      {apiError && <ErrorMessage error={apiError} />}
      <Button
        type="submit"
        disabled={!formState.isValid || !formState.isDirty}
        loading={formState.isSubmitting}
        color="teal"
        content="Register"
        fluid
      />
    </Form>
  );
};

export default RegisterForm;
