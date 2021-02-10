import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
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
  putInSelect: [
    {
      label: "Put In",
      name: "putIn",
    },
  ],
  takeOutSelect: [
    {
      label: "Take Out",
      name: "takeOut",
    },
  ],
};

const schema = yup.object().shape({
  title: yup.string().required().min(4),
  date: yup.object().required(),
  putIn: yup.object().required(),
  takeOut: yup.object().required(),
});

// let putInObjects = [];

const CreateTrip = ({ river, accesses }) => {
  // React-Hook-Form Data State
  const [submittedData, setSubmittedData] = useState({});
  const [putInOptions, setPutInOptions] = useState([]);
  const [takeOutOptions, setTakeOutOptions] = useState([]);

  // React Hook Form Ctrl w/ Yup Validation
  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    // data.date = dateChoice;
    setSubmittedData(data);
    e.target.reset();
  };

  // Set Accesses as Options
  useEffect(() => {
    if (accesses) {
      let putInObjects = [];
      let takeOutObjects = [];
      for (let i = 0; i < accesses.length; i++) {
        const obj = {
          value: `${accesses[i].id}`,
          label: `${accesses[i].name}`,
        };
        if (accesses[i].put_in_option) {
          putInObjects.push(obj);
        } else if (accesses[i].take_out_option) {
          takeOutObjects.push(obj);
        }
      }
      setPutInOptions(putInObjects);
      setTakeOutOptions(takeOutObjects);
    }
  }, [accesses]);

  useEffect(() => {
    if (submittedData.title !== undefined) {
    }
  }, [submittedData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 1.1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ease: "easeInOut", duration: 0.1 }}
      className="createform-container form"
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
        {content.datePicker.map((input, key) => {
          return (
            <div className="form_element">
              <label>{input.label}</label>
              <Controller
                key={key}
                name={input.name}
                control={control}
                // ref={register}
                render={(
                  { onChange, onBlur, value, name, ref },
                  { invalid, isTouched, isDirty }
                ) => (
                  <DatePicker
                    name={input.name}
                    value={value}
                    onChange={onChange}
                    ref={register}
                    inputPlaceholder="Select a day"
                    shouldHighlightWeekends
                  />
                )}
              />
              <p>{errors[input.name]?.message}</p>
            </div>
          );
        })}
        {content.putInSelect.map((input, key) => {
          return (
            <div className="form_element">
              <label>{input.label}</label>
              <Controller
                control={control}
                name={content.putInSelect[0].name}
                ref={register}
                render={(
                  { onChange, onBlur, value, name, ref },
                  { invalid, isTouched, isDirty }
                ) => (
                  <Select
                    name={content.putInSelect[0].name}
                    value={value}
                    onChange={onChange}
                    options={putInOptions}
                  />
                )}
              />
              <p>{errors[content.putInSelect[0].name]?.message}</p>
            </div>
          );
        })}
        {content.takeOutSelect.map((input, key) => {
          return (
            <div className="form_element">
              <label>{input.label}</label>
              <Controller
                control={control}
                name={content.takeOutSelect[0].name}
                ref={register}
                render={(
                  { onChange, onBlur, value, name, ref },
                  { invalid, isTouched, isDirty }
                ) => (
                  <Select
                    name={name}
                    value={value}
                    onChange={onChange}
                    options={takeOutOptions}
                  />
                )}
              />
              <p>{errors[content.takeOutSelect[0].name]?.message}</p>
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

export default CreateTrip;
