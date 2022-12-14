import { Box, Button, Link } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../../../components/form-controls/InputField'
import PasswordField from '../../../../components/form-controls/PasswordField'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const RegisterForm = (props) => {
  const { handleRegister } = props
  const schema = yup
    .object({
      email: yup
        .string()
        .required('Please enter your email')
        .email('Please enter a valid email address'),
      password: yup
        .string()
        .required('Please enter your password')
        .min(6, 'Please enter at least 6 characters'),
      retypePassword: yup
        .string()
        .required('Please enter retype your password')
        .oneOf([yup.ref('password')], 'Password does not match'),
    })
    .required()
  const form = useForm({
    defaultValues: { email: '', password: '', retypePassword: '' },
    resolver: yupResolver(schema),
  })

  const onSubmitForm = async (values) => {
    if (!handleRegister) return
    await handleRegister(values)
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '15px',
          fontWeight: 600,
          marginBottom: '5px',
          'span:last-of-type': {
            fontWeight: 400,
            color: 'rgba(22, 24, 35, 0.75)',
            fontSize: '12px',
          },
        }}
      >
        <span>Email</span>
        <span>Sign up with phone</span>
      </Box>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <InputField
          form={form}
          name="email"
          placeholder="Email or username"
          disabled={form.formState.isSubmitting}
        />
        <PasswordField
          form={form}
          name="password"
          placeholder="Password"
          disabled={form.formState.isSubmitting}
        />
        <PasswordField
          form={form}
          name="retypePassword"
          placeholder="Retype password"
          disabled={form.formState.isSubmitting}
        />
        <Link
          sx={{
            fontSize: '12px',
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Forgot password?
        </Link>
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          fullWidth
          sx={{
            marginTop: '20px',
            backgroundColor: 'rgb(254, 44, 85,0.9)',
            color: 'rgb(255, 255, 255)',
            borderRadius: '4px',
            minHeight: '46px',
            textTransform: 'capitalize',
            fontSize: '16px',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'rgb(254, 44, 85)',
            },
          }}
        >
          {form.formState.isSubmitting ? (
            <div
              className="loading-spin"
              style={{
                width: '25px',
                height: '25px',
                border: '3px solid white',
                borderRadius: '50%',
                borderBottom: '3px solid transparent',
              }}
            ></div>
          ) : (
            'Login'
          )}
        </Button>
      </form>
    </>
  )
}

export default RegisterForm
