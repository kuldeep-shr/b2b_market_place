import * as classNames from "./styles";

// components
import HeaderNav from "components/header-nav";
import SignInForm from "components/sign-in-form";

// components

const SignIn = () => {
  return (
    <>
      <HeaderNav />
      <div css={classNames.container}>
        <SignInForm />
        <p>or</p>
        <p>
          Not a user yet <a href="sign-up">Sign Up</a>
        </p>
      </div>
    </>
  );
};

export default SignIn;
