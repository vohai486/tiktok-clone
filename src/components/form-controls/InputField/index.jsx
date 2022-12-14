import { Box, InputBase, styled, TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

const InputStyled = styled(InputBase)({
  border: '1px solid rgba(22, 24, 35, 0.12)',
  borderRadius: '2px',
  '&.Mui-error': {
    fontSize: '14px',
    borderColor: 'rgb(255, 76, 58)',
    color: 'rgb(255, 76, 58)',
  },
  '&.Mui-disabled': {
    pointerEvent: 'none',
  },
  input: {
    padding: 0,
    paddingInlineStart: '12px',
    paddingInlineEnd: '60px',
    caretColor: 'rgb(254, 44, 85)',
    backgroundColor: 'rgba(22, 24, 35, 0.06)',
    lineHeight: '100%',
    height: '42px',
    '&::placeholder': {
      color: 'rgba(22, 24, 35, 0.34)',
    },
  },
})
const InputField = (props) => {
  const { form, name, placeholder, disabled } = props
  const { errors } = form.formState
  return (
    <Controller
      name={name}
      control={form.control}
      placeholder={placeholder}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <Box sx={{ marginBottom: '10px' }}>
          <InputStyled
            autoComplete={'on'}
            disabled={disabled}
            variant="standard"
            error={invalid}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            fullWidth
            type="text"
          ></InputStyled>
          {invalid && (
            <span
              style={{
                fontSize: '12px',
                lineHeight: '15px',
                color: 'rgb(255, 76, 58)',
              }}
            >
              {errors[name]?.message}
            </span>
          )}
        </Box>
      )}
    ></Controller>
  )
}

export default InputField
