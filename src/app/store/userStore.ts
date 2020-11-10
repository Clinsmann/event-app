import { observable, computed, action, runInAction, makeObservable } from "mobx";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { history } from "../..";
import { IUser, IUserFormValues } from "../common/models/user";

export default class UserStore {
  rootStore: RootStore;
  @observable user: IUser | null = null;

  constructor(rootStore: RootStore) {
    makeObservable(this);

    this.rootStore = rootStore;
  }

  @computed
  get isLoggedIn() {
    return !!this.user;
  }

  @action
  login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  @action
  registerUser = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  @action
  getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action
  logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push("/");
  };
}
