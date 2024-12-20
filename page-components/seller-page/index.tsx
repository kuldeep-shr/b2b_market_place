import { useEffect, useState } from "react";
import axios from "axios";
import * as classNames from "./styles";

// components
import User from "components/user";
import HeaderNav from "components/header-nav";
import ProductList from "components/product-list";

// types
import { User as UserType } from "components/user/types";
import { useRouter } from "next/router";

const SellerPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserType>();

  const id = router.query.id;

  const BASE_URL = "https://b2b-market-place-iota.vercel.app/api";

  const fetchSeller = () => {
    axios.get(`${BASE_URL}/sellers?id=${id}`).then((res) => {
      if (res.data && res.data) {
        setUser(res.data.data[0]);
      }
    });
  };

  useEffect(() => {
    if (id) fetchSeller();
  }, [id]);

  return (
    <>
      <HeaderNav />
      <div css={classNames.container}>
        {user ? (
          <>
            <User user={user} />
            <div css={classNames.divider}></div>
            <ProductList sellerId={id} />
          </>
        ) : null}
      </div>
    </>
  );
};

export default SellerPage;
