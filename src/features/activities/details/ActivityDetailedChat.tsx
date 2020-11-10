import React, { useContext, useEffect } from "react";
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { formatDistance } from "date-fns";
import { useForm } from "react-hook-form";
import { TextAreaInput } from "../../../app/common/form-controls";
import { RootStoreContext } from "../../../app/store/rootStore";

const ActivityDetailedChat = () => {
  const rootStore = useContext(RootStoreContext);
  const { createHubConnection, stopHubConnection, addComment, activity } = rootStore.activityStore;

  const { register, handleSubmit, formState, reset, getValues } = useForm<{}>();

  useEffect(() => {
    createHubConnection(activity!.id);
    return () => {
      stopHubConnection();
    };
  }, [createHubConnection, stopHubConnection, activity]);

  return (
    <>
      <Segment textAlign="center" attached="top" inverted color="teal" style={{ border: "none" }}>
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {activity &&
            activity.comments &&
            activity.comments.map((comment) => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.image || "/assets/user.png"} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.username}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDistance(new Date(comment.createdAt), new Date())}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))}

          <Form onSubmit={handleSubmit(() => addComment(getValues()).then(() => reset()))} noValidate>
            <TextAreaInput
              name="body"
              rows={2}
              placeholder="Add your comment"
              register={register}
              formState={formState}
            />
            <Button
              type="submit"
              loading={formState.isSubmitting}
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
      </Segment>
    </>
  );
};

export default observer(ActivityDetailedChat);
