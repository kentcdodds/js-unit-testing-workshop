import React from 'react'
import glamorous from 'glamorous'

const Input = glamorous.input({
  background: 'white',
  height: 50,
  border: 'none',
  borderRadius: 10,
  boxShadow: 'var(--shadow)',
  borderBottom: 5,
  width: '30%',
  display: 'block',
  margin: '0 auto 10px auto',
  paddingLeft: 10,
  '::placeholder': {
    opacity: 0.5,
  },
  '@media only screen and (max-width: 744px)': {
    width: '70%',
  },
})

const Button = glamorous.input({
  background: 'var(--green)',
  padding: '10px 20px',
  display: 'block',
  margin: 'auto',
  color: 'white',
  borderRadius: 10,
  boxShadow: 'var(--shadow)',
  cursor: 'pointer',
  transition: '0.5s',
  ':hover': {
    boxShadow: 'var(--shadowHover)',
  },
})
function Login({onSubmit}) {
  return (
    <div>
      <form
        data-test="login-form"
        onSubmit={e => {
          e.preventDefault()
          const {username, password} = e.target.elements
          onSubmit({
            username: username.value,
            password: password.value,
          })
        }}
      >
        <Input
          placeholder="Username..."
          name="username"
          data-test="username-input"
        />
        <Input
          placeholder="Password..."
          type="password"
          name="password"
          data-test="password-input"
        />
        <Button type="submit" data-test="login-submit" />
      </form>
    </div>
  )
}

export default Login
