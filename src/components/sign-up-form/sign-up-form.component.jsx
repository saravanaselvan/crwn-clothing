import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = formFields;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password,
      );
      const userDocRef = await createUserDocumentFromAuth({
        ...user,
        displayName,
      });
      console.log(userDocRef);
      resetFormFields();
    } catch (err) {
      console.log(err.code);
      if (err.code === "auth/email-already-in-use") {
        alert("Email already exists");
      } else if (err.code === "auth/weak-password") {
        alert(err.message);
      }
    }
  };

  const handleInput = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleInput}
          required
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleInput}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleInput}
          required
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleInput}
          required
        />
        <Button buttonType="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
