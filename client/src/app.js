import React from 'react'
import glamorous from 'glamorous'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import User from './components/user'
import Login from './components/login'
import Home from './screens/home'
import Editor from './screens/editor'
import githubLogo from './assets/github.svg'
import twitterLogo from './assets/twitter.svg'

const Header = glamorous.div({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '20px 0px',
})
const TitleContainer = glamorous.div({
  background: 'white',
  textAlign: 'center',
  display: 'flex',
  padding: '30px 50px',
  boxShadow: 'var(--shadow)',
  borderRadius: '50px',
  '@media only screen and (max-width: 895px)': {
    order: 0,
  },
})

const Title = glamorous.h1({
  color: 'var(--green)',
  fontSize: 50,
  lineHeight: '40px',
})

const SecondaryTitle = glamorous.span({
  color: 'var(--black)',
})

const Inspired = glamorous.small({
  transition:'0.5s',
  ':hover':{
    color:'var(--green)'
  }
})
const SocialLogo = glamorous.img({
  width: 25,
  background: 'white',
  boxShadow: 'var(--shadow)',
  borderRadius: 20,
  padding: 15,
  marginRight: 15,
  transition: '0.5s',
  ':hover': {
    boxShadow: 'var(--shadowHover)',
  },
})
const UserBtnsContainer = glamorous.div({
  width: '25%',
  display: 'flex',
  justifyContent: 'center',
  '@media only screen and (max-width: 895px)': {
    order: 1,
    marginTop: 10,
    width: '50%',
  },
})
const UserBtn = glamorous.span({
  background: 'white',
  boxShadow: 'var(--shadow)',
  borderRadius: 15,
  padding: 15,
  marginLeft: 15,
  cursor:'pointer',
  transition: '0.5s',
  ':hover': {
    boxShadow: 'var(--shadowHover)',
  },
})

const NewPostBtn = glamorous.span({
  background: 'var(--green)',
  boxShadow: 'var(--shadow)',
  color:'white',
  fontSize:40,
  borderRadius: 15,
  padding: 15,
  lineHeight:0.5,
  transition: '0.5s',
  cursor:'pointer',
  position:'fixed',
  bottom:10,
  right:10,  
  ':hover': {
    boxShadow: 'var(--shadowHover)',
  },
})

const SocialMedia = () => (
  <UserBtnsContainer>
    <a href="#">
      <SocialLogo src={twitterLogo} />
    </a>
    <a href="#">
      <SocialLogo src={githubLogo} />
    </a>
  </UserBtnsContainer>
)

function App() {
  return (
    <User>
      {({user, error, pending, login, logout, register}) =>
        pending ? (
          <div>Loading...</div>
        ) : (
          <Router>
            <div>
              {error ? (
                <pre>{JSON.stringify(error.response, null, 2)}</pre>
              ) : null}
              <Header>
                <SocialMedia />
                <TitleContainer>
                  <div>
                    <Title>
                      <Link to="/">
                        TODAY<br />
                        <SecondaryTitle>I LEARNED</SecondaryTitle>
                      </Link>
                    </Title>
                    <Inspired>
                      Inspired by{' '}
                      <a href="https://til.hashrocket.com/">
                        til.hashrocket.com
                      </a>
                    </Inspired>
                  </div>
                </TitleContainer>
                <UserBtnsContainer>
                  {user ? (
                    <div>
                      <UserBtn data-test="username-display">{user.username.split('@')[0]}</UserBtn>
                      <UserBtn onClick={logout}>Logout</UserBtn>
                      <NewPostBtn><Link to="/editor">+</Link></NewPostBtn>
                    </div>
                  ) : (
                    <div>
                      <Link to="/login" data-test="login-link">
                        <UserBtn>Login</UserBtn>
                      </Link>
                      <Link to="/register" data-test="register-link">
                        <UserBtn>Register</UserBtn>
                      </Link>
                    </div>
                  )}
                </UserBtnsContainer>
              </Header>

              <Route exact path="/" component={Home} />

              {user ? (
                <Route
                  path="/editor/:postId?"
                  render={props => <Editor user={user} {...props} />}
                />
              ) : null}
              <React.Fragment>
                <Route
                  path="/login"
                  render={() =>
                    user ? <Redirect to="/" /> : <Login onSubmit={login} />
                  }
                />
                <Route
                  path="/register"
                  render={() =>
                    user ? <Redirect to="/" /> : <Login onSubmit={register} />
                  }
                />
              </React.Fragment>
            </div>
          </Router>
        )
      }
    </User>
  )
}

export default App
