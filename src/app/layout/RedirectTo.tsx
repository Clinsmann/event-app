import { history } from "../..";

export const RedirectTo = (location: any) => {
  const { from } = (location?.state as any) || { from: { pathname: "/activities" } };
  history.push(from);
};
