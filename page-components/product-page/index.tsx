import { useEffect, useState } from "react";
import axios from "axios";
import * as classNames from "./styles";

// components
import Product from "components/product";
import HeaderNav from "components/header-nav";

// types
import { Product as ProductType } from "components/product/types";
import { useRouter } from "next/router";

const ProductPage = () => {
  const router = useRouter();
  const [product, setProduct] = useState<ProductType>();

  const id = router.query.id;

  const BASE_URL = "https://b2b-market-place-iota.vercel.app/api";

  const fetchProduct = () => {
    axios.get(`${BASE_URL}/products?id=${id}`).then((res) => {
      if (res.data && res.data) {
        setProduct(res.data.data[0]);
      }
    });
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  return (
    <>
      <HeaderNav />
      <div css={classNames.container}>
        {product ? (
          <>
            <Product product={product} />
            <div css={classNames.product}>
              <h1>{product.name}</h1>
              <div css={classNames.divider}></div>
              <p>{product.description}</p>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ProductPage;
