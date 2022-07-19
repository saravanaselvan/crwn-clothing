import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

const defaultFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFields);
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        alert("Invalid credentials");
      } else if (error) {
        alert("Something went wrong");
      }
    }
  };
  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Please sign in</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          value={email}
          name="email"
          onChange={onChangeHandler}
        />
        <FormInput
          label="Password"
          type="password"
          required
          value={password}
          name="password"
          onChange={onChangeHandler}
        />
        <div className="btn-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
