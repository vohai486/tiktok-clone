import React from "react";
import { Controller } from "react-hook-form";

const InputEdit = (props) => {
  const { form, name, disabled } = props;
  const { errors } = form.formState;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <input
          autoComplete={"on"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type="text"
          disabled={disabled}
        ></input>
      )}
    ></Controller>
  );
};

export default InputEdit;
