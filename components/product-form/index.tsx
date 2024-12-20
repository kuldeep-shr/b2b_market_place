import { useState, ChangeEvent, useEffect } from "react";
import * as classNames from "./styles";
import axios from "axios";
import { useRouter } from "next/router";

// types
import { User } from "components/user/types";

// components

const ProductForm = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const BASE_URL = "https://b2b-market-place-iota.vercel.app/api";

  useEffect(() => {
    const userFromStorage = window.localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  const handleSubmit = () => {
    // add product to library
    axios
      .post(
        `${BASE_URL}/products`,
        {
          name,
          description,
          image,
          status: "available",
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        if (res.data && res.data.data.id) {
          router.push("/profile");
        }
      });
  };

  return (
    <div css={classNames.container}>
      <div>
        <h1>Add Product</h1>
        <form css={classNames.form}>
          <input
            placeholder="Name"
            css={classNames.input}
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
          <input
            placeholder="Description"
            css={classNames.input}
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setDescription(e.target.value);
            }}
            type="textarea"
          />
          <input
            placeholder="Image"
            css={classNames.input}
            value={image}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setImage(e.target.value);
            }}
          />
        </form>
        <button css={classNames.button} onClick={() => handleSubmit()}>
          Add to library
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
