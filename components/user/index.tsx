import * as classNames from "./styles";
import { useRouter } from "next/router";

// types
import { Props } from "./types";

const User = (props: Props) => {
  const { user } = props;
  const router = useRouter();

  const handleClick = () => router.push(`/sellers/${user.id}`);

  return (
    <div css={classNames.profile} onClick={handleClick}>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Contact: {user.contact}</p>
    </div>
  );
};

export default User;
