import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { login } from "../../actions/userActions";

const content = {
  inputs: [
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    },
  ],
};

const schema = yup.object().shape({
  email: yup.string().required().max(50).email(),
  password: yup.string().required().min(6).max(30),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const [submittedData, setSubmittedData] = useState({});

  // React Hook Form Ctrl w/ Yup Validation
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setSubmittedData(data);
    e.target.reset();
  };

  useEffect(() => {
    if (submittedData.password !== undefined) {
      dispatch(login(submittedData));
    }
  }, [submittedData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 1.1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ease: "easeInOut", duration: 0.1 }}
      className="loginform-container form"
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
    </motion.div>
  );
};

export default LoginForm;
