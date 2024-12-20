export type User = {
  id: number;
  name: string;
  contact: string;
  email: string;
  image: string;
  token?: string;
};

export interface Props {
  user: User;
}
