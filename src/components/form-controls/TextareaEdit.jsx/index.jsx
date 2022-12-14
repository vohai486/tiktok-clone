import React from "react";
import { Controller } from "react-hook-form";

const TextareaEdit = (props) => {
  const { form, name, placeholder } = props;
  const { errors } = form.formState;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <textarea
          placeholder={placeholder}
          autoComplete={"on"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type="text"
        ></textarea>
      )}
    ></Controller>
  );
};

export default TextareaEdit;
