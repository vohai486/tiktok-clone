import { Box, IconButton, InputBase, styled } from '@mui/material'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { IconHideEye, IconShowEye } from '../../Icons'

const InputStyled = styled(InputBase)({
  border: '1px solid rgba(22, 24, 35, 0.12)',
  borderRadius: '2px',
  '.borderError': {
    borderColor: 'rgb(255, 76, 58)',
    color: 'rgb(255, 76, 58)',
  },

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
const PasswordField = (props) => {
  const { form, name, placeholder, disabled } = props
  const { errors } = form.formState
  const [showPassword, setShowPassword] = useState(false)
  return (
    <Controller
      name={name}
      control={form.control}
      placeholder={placeholder}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <Box sx={{ position: 'relative', marginBottom: '10px', padding: 0 }}>
          <InputStyled
            autoComplete={'on'}
            control={form.control}
            name={name}
            disabled={disabled}
            error={invalid}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            fullWidth
            type={showPassword ? 'text' : 'password'}
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

          <Box sx={{ position: 'absolute', right: '2%', top: '13%' }}>
            <IconButton onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <IconShowEye /> : <IconHideEye />}
            </IconButton>
          </Box>
        </Box>
      )}
    ></Controller>
  )
}

export default PasswordField
