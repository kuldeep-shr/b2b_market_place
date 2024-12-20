import { useMemo, useState, ChangeEvent } from "react";
import * as classNames from "./styles";
import axios from "axios";
import { useRouter } from "next/router";

// helpers
import { validateEmail } from "utils/helper-functions";

const SignInForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const BASE_URL = "https://b2b-market-place-iota.vercel.app/api";

  const validEmail = useMemo(() => validateEmail(email), [email]);
  const validPassword = useMemo(
    () => password && password.length >= 8,
    [password]
  );

  const handleSubmit = () => {
    if (validEmail && validPassword) {
      // signin user
      axios
        .post(`${BASE_URL}/users/login`, {
          email,
          password,
        })
        .then((res) => {
          console.log({ res });
          if (res.data && res.data.data && res.data.data[0].token) {
            window.localStorage.setItem("token", res.data.data[0].token);
            window.localStorage.setItem(
              "user",
              JSON.stringify(res.data.data[0])
            );
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
        <h1>Sign In</h1>
        <form css={classNames.form}>
          <input
            placeholder="Email"
            css={classNames.input({ error: Boolean(error.length) })}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <input
            placeholder="Password"
            type="password"
            css={classNames.input({ error: Boolean(error.length) })}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
        </form>
        <button css={classNames.button} onClick={handleSubmit}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
