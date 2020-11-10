import { category } from "../data/categoryOptions";

export interface IActivitiesEnvelope {
  activities: IActivity[];
  activityCount: number;
}

export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  city: string;
  venue: string;
  isGoing: boolean;
  isHost: boolean;
  attendees: IAttendee[];
  comments: IComment[];
}

export interface IComment {
  id: string;
  createdAt: Date;
  body: string;
  username: string;
  displayName: string;
  image: string;
}

export interface IActivityFormValues extends Partial<IActivity> {
  time?: Date;
  selectedCategory?: { value: string, label: string }
}

export class ActivityFormValues implements IActivityFormValues {
  id?: string = undefined;
  title: string = "";
  category: string  = "";
  selectedCategory?: { value: string, label: string } = undefined;
  description: string = "";
  date?: Date = undefined;
  time?: Date = undefined;
  city: string = "";
  venue: string = "";

  constructor(init?: IActivityFormValues) {
    if (init) {
      if(init.date){
      init.time = init.date;
      }
      if(init.category){
        init.selectedCategory = category.filter(x=> x.value === init.category)[0];
      }
    }

    Object.assign(this, init);
  }
}

export interface IAttendee {
  username: string;
  displayName: string;
  image: string;
  isHost: boolean;
  following?: boolean;
}
