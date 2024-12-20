import * as classNames from "./styles";

// components
import HeaderNav from "components/header-nav";
import SignUpForm from "components/sign-up-form";

// components

const SignUp = () => {
  return (
    <>
      <HeaderNav />
      <div css={classNames.container}>
        <SignUpForm />
        <p>or</p>
        <p>
          Already a user <a href="sign-in">Sign In</a>
        </p>
      </div>
    </>
  );
};

export default SignUp;
