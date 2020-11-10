import { IActivity, IAttendee } from "../common/models/activity";
import { IUser } from "../common/models/user";

export const combineDateAndTime = (date: Date, time: any) => {
  const dateString = date.toISOString().split("T")[0];
  const timeString = (time as string).includes("T") ? new Date(time).toISOString().split("T")[1] : `${time}:00.000Z`;

  return new Date(dateString + "T" + timeString);
};

export const setActivityProps = (activity: IActivity, user: IUser) => {
  activity.date = new Date(activity.date);
  activity.isGoing = activity.attendees.some((a) => a.username === user.username);
  activity.isHost = activity.attendees.some((a) => a.username === user.username && a.isHost);
  return activity;
};

export const createAttendee = (user: IUser): IAttendee => {
  return {
    displayName: user.displayName,
    isHost: false,
    username: user.username,
    image: user.image!,
  };
};
