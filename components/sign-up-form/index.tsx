import { useMemo, useState, ChangeEvent, useEffect } from "react";
import * as classNames from "./styles";
import axios from "axios";
import { useRouter } from "next/router";

// helpers
import { validateEmail } from "utils/helper-functions";

// components

const SignUpForm = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [contact, setContact] = useState<string>("");

  const BASE_URL = "http://localhost:8000/api";

  const validName = useMemo(() => Boolean(name && name.length > 0), [name]);
  const validContact = useMemo(
    () => Boolean(contact && contact.length > 0),
    [contact]
  );
  const validEmail = useMemo(() => validateEmail(email), [email]);
  const validPassword = useMemo(
    () => Boolean(password && password.length >= 8),
    [password]
  );

  console.log({ validEmail, validPassword, validName, validContact });

  const handleSubmit = () => {
    if (validName && validEmail && validPassword && validContact) {
      // register user
      axios
        .post(`${BASE_URL}/users/register`, {
          name,
          email,
          password,
          contact,
        })
        .then((res) => {
          if (res.data && res.data.data && res.data.data.token) {
            window.localStorage.setItem("token", res.data.data.token);
            window.localStorage.setItem("user", JSON.stringify(res.data.data));
            router.push("/profile");
          } else {
            setError("Something went wrong!");
          }
        });
    } else {
      setError("Enter valid Email & Password");
    }
  };

  return (
    <div css={classNames.container}>
      <div>
        {error ? (
          <div>
            <p>{error}</p>
          </div>
        ) : null}
        <h1>Sign Up</h1>
        <form css={classNames.form}>
          <input
            placeholder="Name"
            css={classNames.input({ error: validName })}
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />{" "}
          <input
            placeholder="Phone"
            css={classNames.input({ error: validContact })}
            value={contact}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setContact(e.target.value);
            }}
          />
          <input
            placeholder="Email"
            css={classNames.input({ error: validEmail })}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <input
            placeholder="Password"
            type="password"
            css={classNames.input({ error: validPassword })}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
        </form>
        <button css={classNames.button} onClick={() => handleSubmit()}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
