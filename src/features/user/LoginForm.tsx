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
import { RedirectTo } from "../../app/layout/RedirectTo";
import { useLocation } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginForm = () => {
  const location = useLocation();
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  const [apiError, setApiError] = useState<AxiosResponse>();

  const { register, handleSubmit, formState } = useForm<IUserFormValues>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IUserFormValues) =>
    login(data)
      .then(() => RedirectTo(location))
      .catch((error: AxiosResponse) => setApiError(error));

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Header as="h2" content="Login to Reactivities" color="teal" textAlign="center" />
      <TextInput name="email" type="email" placeholder="Email" register={register} formState={formState} />
      <TextInput name="password" type="password" placeholder="Password" register={register} formState={formState} />
      {apiError && <ErrorMessage error={apiError} text="Invalid email or password" />}
      <Button
        type="submit"
        disabled={!formState.isValid || !formState.isDirty}
        loading={formState.isSubmitting}
        color="teal"
        content="Login"
        fluid
      />
      {/* <pre>{JSON.stringify(formState, null, 2)}</pre> */}
    </Form>
  );
};

export default LoginForm;
