import { Button, Flex, Form, Input, Typography } from 'antd'
import { AxiosError } from 'axios'
import { FC, useEffect } from 'react'

import { SignInLoginParams } from 'app/api/requests/auth'
import {
  SignInFieldType,
  SignInFieldValidationRules,
} from 'shared/constants/validationRules'
import { setLocalStorageUser } from 'shared/utils/userLocalStorage'

import { authRequests } from 'app/api'

import { userApi } from 'app/redux/api'
import { userSlice } from 'app/redux/slice/user'
import classes from 'pages/signUp/SignUp.module.scss'
import { useDispatch } from 'react-redux'

import { Link, useNavigate } from 'react-router-dom'
import { isEmpty } from 'shared/helpers/isEmpty'

export const SignIn: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = userApi.useGetUserQuery(undefined, { skip: true })
  const [signIn] = userApi.useSignInMutation()

  useEffect(() => {
    if (user.data && !isEmpty(user.data)) {
      setLocalStorageUser(user.data)
      navigate('/')
    }
  }, [])

  const onFinish = async (values: SignInLoginParams) => {
    try {
      const response = await signIn(values).unwrap()

      dispatch(userSlice.actions.setUser(response))
      setLocalStorageUser(response)
    } catch (e) {
      const error = e as AxiosError
      if (error.response?.status === 400) {
        authRequests.getUser().then(resp => {
          setLocalStorageUser(resp.data)
        })
      }
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <Form name="signIn" onFinish={onFinish}>
          <Typography>
            <Typography.Title
              className={classes.title}
              style={{ margin: '0 0 55px', fontSize: 36, fontWeight: 400 }}>
              Authorization
            </Typography.Title>
          </Typography>

          <Form.Item<SignInFieldType>
            name="login"
            validateTrigger={['onBlur', 'onFocus']}
            rules={SignInFieldValidationRules['login']}>
            <Input
              className={classes.input}
              size="large"
              placeholder="Login *"
            />
          </Form.Item>

          <Form.Item<SignInFieldType>
            name="password"
            validateTrigger={['onBlur', 'onFocus']}
            rules={SignInFieldValidationRules['password']}>
            <Input.Password
              className={classes.input}
              size="large"
              placeholder="Password *"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="default"
              shape="round"
              size="large"
              htmlType="submit"
              style={{
                margin: '55px 0 0',
                padding: '12px 0',
                boxSizing: 'content-box',
              }}
              block>
              Login
            </Button>
          </Form.Item>
        </Form>

        <Flex justify="center" align="center">
          <Typography>
            <Typography.Text>No account?</Typography.Text>
          </Typography>
          <Button type="link" className={classes.backBtn}>
            <Link to="/signUp">Create</Link>
          </Button>
        </Flex>
      </div>
    </div>
  )
}
