import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react-lite";
import { Form, Button } from "semantic-ui-react";
import { TextInput, TextAreaInput } from "../../app/common/form-controls";
import { IProfile } from "../../app/common/models/profile";

const schema = yup.object().shape({
  displayName: yup.string().required(),
});

interface IProps {
  updateProfile: (profile: Partial<IProfile>) => void;
  profile: IProfile;
}

const ProfileEditForm: React.FC<IProps> = ({ updateProfile, profile }) => {
  const { register, handleSubmit, formState } = useForm<IProfile>({
    mode: "onBlur", //onChange
    resolver: yupResolver(schema),
    defaultValues: profile,
  });

  return (
    <Form onSubmit={handleSubmit(updateProfile)} noValidate>
      <TextInput name="displayName" placeholder="Display Name" register={register} formState={formState} />
      <TextAreaInput name="bio" placeholder="Bio" rows={3} register={register} formState={formState} />
      <Button
        disabled={!formState.isValid || !formState.isDirty}
        loading={formState.isSubmitting}
        positive
        content="Update profile"
      />
    </Form>
  );
};

export default observer(ProfileEditForm);
