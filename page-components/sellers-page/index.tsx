import { useEffect, useState } from "react";
import axios from "axios";
import * as classNames from "./styles";

// components
import User from "components/user";
import HeaderNav from "components/header-nav";

// types
import { User as UserType } from "components/user/types";

const Sellers = () => {
  const [users, setUsers] = useState<Array<UserType>>();

  const BASE_URL = "https://b2b-market-place-iota.vercel.app/api";

  const fetchSellers = () => {
    axios.get(`${BASE_URL}/sellers`).then((res) => {
      console.log({ res });
      if (res.data && res.data.data.length) {
        setUsers(res.data.data);
      }
    });
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <>
      <HeaderNav />
      {users && users.length ? (
        <div css={classNames.container}>
          {users.map(({ id, ...rest }) => (
            <User key={id} user={{ id, ...rest }} />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Sellers;
