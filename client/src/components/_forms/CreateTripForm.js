import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DateTimePicker from "react-datetime-picker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { createTrip } from "../../actions/tripActions";

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
  date: yup.date().required(),
  putIn: yup.object().required(),
  takeOut: yup.object().required(),
});

// let putInObjects = [];

const CreateTrip = ({ river, accesses }) => {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.profile.id);
  const [dateVal, setDateVal] = useState(new Date());
  const dateValHandler = (e) => setDateVal(e.target.value);

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
      const token = window.localStorage.getItem("auth_token");
      const data = {
        title: submittedData.title,
        dateTime: submittedData.date,
        putinID: submittedData.putIn.value,
        takeoutID: submittedData.takeOut.value,
        riverID: river.id,
        userID: userID,
      };
      dispatch(createTrip(token, data));
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
        {content.datePicker.map((input, key) => {
          return (
            <div className="form_element">
              <label>{input.label}</label>
              <Controller
                key={key}
                name={input.name}
                control={control}
                onChange={dateValHandler}
                defaultValue={dateVal}
                // ref={register}
                render={(
                  { onChange, onBlur, value, name, ref },
                  { invalid, isTouched, isDirty }
                ) => (
                  <DateTimePicker
                    name={input.name}
                    value={value}
                    onChange={onChange}
                    ref={register}
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
                    classNamePrefix={"react-select"}
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
                    classNamePrefix={"react-select"}
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
