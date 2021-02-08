import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BASE_URL } from "../../config";
import { motion } from "framer-motion";

const content = {
  inputs: [
    {
      label: "Title",
      name: "title",
      type: "text",
    },
  ],
};

const schema = yup.object().shape({
  title: yup.string().required.min(4),
});

const CreateTrip = ({ river, accesses }) => {
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
    if (submittedData.title !== undefined) {
    }
  }, [submittedData]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 1.1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ease: "easeInOut", duration: 0.1 }}
      className="createtripform-container form"
    >
      <h2>Create A Trip</h2>
      <form onSubmit={handleSubmit(onSubmit)}></form>
    </motion.div>
  );
};

export default CreateTrip;
