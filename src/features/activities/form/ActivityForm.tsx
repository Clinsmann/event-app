import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { category } from "../../../app/common/data/categoryOptions";
import { TextInput, TextAreaInput, SelectInput, DatePicker, TimePicker } from "../../../app/common/form-controls";
import { ActivityFormValues } from "../../../app/common/models/activity";
import { RootStoreContext } from "../../../app/store/rootStore";
import { combineDateAndTime } from "../../../app/util/util";

const schema = yup.object().shape({
  title: yup.string().required("The event title is required"),
  // category: yup.string().required(),
  selectedCategory: yup.object().required(),
  description: yup.string().min(5).required("Description needs to be at least 5 characters"),
  city: yup.string().required(),
  venue: yup.string().required(),
  date: yup.date().required(),
  time: yup.string().required(),
});

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const { control, register, handleSubmit, formState, getValues, reset } = useForm<ActivityFormValues>({
    mode: "onBlur", //onChange
    resolver: yupResolver(schema),
  });

  const rootStore = useContext(RootStoreContext);
  const { createActivity, editActivity, submitting, loadActivity } = rootStore.activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then((activity) => {
          const formattedActivity = new ActivityFormValues(activity);
          reset(formattedActivity);
          setActivity(formattedActivity);
        })
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id, reset]);

  const onSubmit = (values: any) => {
    console.log(values.time);
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, selectedCategory, ...activity } = values;
    activity.date = dateAndTime;
    activity.category = selectedCategory.value;
    if (!activity.id) {
      const newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Container text textAlign="center">
      <Segment clearing>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextInput name="title" placeholder="Title" register={register} formState={formState} />
          <TextAreaInput
            name="description"
            placeholder="Description"
            rows={3}
            register={register}
            formState={formState}
          />
          <SelectInput
            name="selectedCategory"
            placeholder="Category"
            options={category}
            defaultValue={getValues().selectedCategory}
            control={control}
            formState={formState}
          />

          <Form.Group widths="equal">
            <DatePicker name="date" placeholder="Date" control={control} formState={formState} />
            <TimePicker name="time" placeholder="Time" control={control} formState={formState} />
          </Form.Group>

          <TextInput name="city" placeholder="City" register={register} formState={formState} />
          <TextInput name="venue" placeholder="Venue" register={register} formState={formState} />

          <Button
            loading={submitting}
            disabled={loading || !formState.isValid || !formState.isDirty}
            floated="right"
            positive
            type="submit"
            content="Submit"
          />

          <Button
            onClick={activity.id ? () => history.push(`/activities/${activity.id}`) : () => history.push("/activities")}
            disabled={loading}
            floated="right"
            type="button"
            content="Cancel"
          />
          {/* <pre>{JSON.stringify(formState, null, 2)}</pre> */}
          {/* <pre>{JSON.stringify(getValues(), null, 2)}</pre> */}
        </Form>
      </Segment>
    </Container>
  );
};

export default observer(ActivityForm);
