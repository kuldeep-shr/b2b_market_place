import { useEffect, useState } from "react";
import * as classNames from "./styles";
import axios from "axios";
import { useRouter } from "next/router";

// types
import { Props } from "./types";
import { User } from "components/user/types";
import { Product as ProductType } from "components/product/types";

const Product = (props: Props) => {
  const { product, refetch } = props;
  const [user, setUser] = useState<User>();

  const router = useRouter();

  const BASE_URL = "https://b2b-market-place-iota.vercel.app/api";

  useEffect(() => {
    const userFromStorage = window.localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  const updateProductStatus = ({ product }: { product: ProductType }) => {
    if (product && user) {
      axios
        .patch(
          `${BASE_URL}/products/${product.id}`,
          {
            status: product.status === "available" ? "sold" : "available",
          },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        .then((res) => {
          if (res && res.data) refetch && refetch();
        });
    }
  };

  const { id, name, description, image, status } = product;

  return (
    <div css={classNames.container}>
      <div
        key={id}
        css={classNames.product}
        onClick={() => router.push(`/products/${id}`)}
      >
        <div css={classNames.head}>
          <img alt={name} src={image} />
          <h6>{name}</h6>
        </div>
        <div css={classNames.body}>
          <p>{description}</p>
          <div
            css={classNames.status({ status })}
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              updateProductStatus({ product });
            }}
          >
            {status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
