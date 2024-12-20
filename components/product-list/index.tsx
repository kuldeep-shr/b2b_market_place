import { useEffect, useState } from "react";
import * as classNames from "./styles";
import axios from "axios";
import { useRouter } from "next/router";

// components
import Product from "components/product";

// types
import { Props } from "./types";
import { Product as ProductType } from "components/product/types";
import { User } from "page-components/profile-page/types";

const ProductList = (props: Props) => {
  const { sellerId, limit } = props;

  console.log({ props });

  const [products, setProducts] = useState<Array<ProductType>>([]);
  const [user, setUser] = useState<User>();

  const router = useRouter();

  const BASE_URL = "https://b2b-market-place-iota.vercel.app/api";

  useEffect(() => {
    const userFromStorage = window.localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  const fetchProducts = () => {
    axios
      .get(
        sellerId
          ? `${BASE_URL}/products?sellerId=${sellerId}`
          : limit
          ? `${BASE_URL}/products?limit=${limit}`
          : `${BASE_URL}/products`
      )
      .then((res) => {
        console.log({ res });
        if (res.data && res.data.data.length) {
          setProducts(res.data.data);
        }
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [sellerId]);

  return (
    <div css={classNames.container}>
      {products.map((product) => {
        const { id, name, description, image, status } = product;
        return <Product product={product} refetch={fetchProducts} />;
      })}
    </div>
  );
};

export default ProductList;
