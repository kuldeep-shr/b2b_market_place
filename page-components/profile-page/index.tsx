import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as classNames from "./styles";

// components
import User from "components/user";
import HeaderNav from "components/header-nav";

// types
import { User as UserType } from "components/user/types";
import ProductList from "components/product-list";

const ProfilePage = () => {
  const [user, setUser] = useState<UserType>();
  const router = useRouter();

  useEffect(() => {
    const userFromStorage = window.localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    } else {
      router.push("/");
    }
  }, []);

  return (
    <>
      <HeaderNav />
      <div css={classNames.container}>{user ? <User user={user} /> : null}</div>
      <div css={classNames.productContainer}>
        <div css={classNames.productHead}>
          <h3>Your Products</h3>
          <button onClick={() => router.push("/products/add")}>
            Add Product
          </button>
        </div>
        <ProductList sellerId={user?.id} />
      </div>
    </>
  );
};

export default ProfilePage;
