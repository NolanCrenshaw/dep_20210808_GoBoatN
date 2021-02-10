import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
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
  datePicker: [
    {
      label: "Date",
      name: "date",
    },
  ],
};

const schema = yup.object().shape({
  title: yup.string().required().min(4),
  date: yup.date().required(),
});

const CreateTrip = () => {
  // React-Hook-Form Data State
  const { control } = useForm();
  const [submittedData, setSubmittedData] = useState({});
  // DatePicker State
  const [dateChoice, setDateChoice] = useState(null);

  // React Hook Form Ctrl w/ Yup Validation
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    data.date = dateChoice;
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
        <Controller
          control={control}
          name={content.datePicker[0].name}
          ref={register}
          render={(
            { onChange, onBlur, value, name, ref },
            { invalid, isTouched, isDirty }
          ) => (
            <DatePicker
              value={dateChoice}
              onChange={setDateChoice}
              inputPlaceholder="Select a day"
              shouldHighlightWeekends
            />
          )}
        />
        <p>{errors[content.datePicker[0].name]?.message}</p>

        <button className="form_button" type="submit">
          Submit
        </button>
      </form>
    </motion.div>
  );
};

export default CreateTrip;
