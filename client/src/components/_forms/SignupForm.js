import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const content = {
  inputs: [
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "Username",
      name: "username",
      type: "text",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    },
    // {
    //   label: "First Name",
    //   name: "firstname",
    //   type: "text",
    // },
    // {
    //   label: "Last Name",
    //   name: "lastname",
    //   type: "text",
    // },
  ],
};

const schema = yup.object().shape({
  email: yup.string().required().email(),
  username: yup.string().required().min(6),
  password: yup.string().required().min(6),
  // firstname: yup.string().required(),
  // lastname: yup.string().required(),
});

const SignupForm = ({ registerLoginAttempt }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data, e) => {
    e.preventDefault();
    registerLoginAttempt();
    console.log(data);
  };

  return (
    <div className="signupform-container form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(submitForm)}>
        {content.inputs.map((input, key) => {
          return (
            <div className="form_element" key={key}>
              <div>
                <label>{input.label}</label>
                <p>{errors[input.name]?.message}</p>
              </div>
              <input name={input.name} type={input.type} ref={register} />
            </div>
          );
        })}
        <button className="form_button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
