import { useState, useEffect } from "react";
import * as classNames from "./styles";

// components
import ProductList from "components/product-list";
import HeaderNav from "components/header-nav";

// types
import { User as UserType } from "components/user/types";

const Home = () => {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const userFromStorage = window.localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  return (
    <>
      <HeaderNav />
      <div css={classNames.container}>
        <div css={classNames.heading}>
          <h1>
            A platform built for new way of
            <span css={classNames.excent}> shopping</span>
          </h1>
          <p>Explore form our wide range of products</p>
          {user ? (
            <a href="/products">
              <button href="/products" css={classNames.button}>
                Explore
              </button>
            </a>
          ) : (
            <a href="/sign-up">
              <button css={classNames.button}>Sign Up</button>
            </a>
          )}
        </div>
        <div css={classNames.products}>
          <div>
            <ProductList limit={5} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
