import { useEffect, useState } from "react";
import * as classNames from "./styles";
import { User } from "page-components/profile-page/types";
import { useRouter } from "next/router";

const HeaderNav = () => {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    const userFromStorage = window.localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <>
      <nav css={classNames.container}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/sellers">Sellers</a>
          </li>
          {user ? (
            <>
              <li>
                <a href="/profile">Profile</a>
              </li>
              <li onClick={logout}>Log Out</li>
            </>
          ) : null}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNav;
