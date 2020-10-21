import { useForm } from 'utils/hooks'
import { LayoutCentered } from 'components/template'
import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap'

import { InputPassword } from 'components/atoms'
import { AuthContext } from 'utils/context'
import swal from 'sweetalert'
import { fetchapi } from 'utils/api'

export default () => {
  const user = useForm({})
  const history = useHistory()
  const location = useLocation()
  const [auth, dispatch] = useContext(AuthContext)
  const from = location.state?.from || { pathname: '/dashboard/order' }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { payload } = await fetchapi('get', '/user/1/update')
      sessionStorage.setItem('auth', JSON.stringify(payload))
      dispatch({
        type: 'LOGIN',
        payload: { ...auth, ...payload[0] },
      })
      history.replace(from)
    } catch (e) {
      swal({
        title: e.message,
        icon: 'danger',
      })
    }
  }

  return (
    <LayoutCentered>
      <Col md="6">
        <Card className="shadow">
          <CardBody>
            <h1 className="text-center my-3">Login</h1>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  required
                  type="email"
                  name="email"
                  placeholder="example@mail.co"
                  onChange={user.changeHandler}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <InputPassword
                  name="password"
                  changeHandler={user.changeHandler}
                />
                <FormText>
                  <a href="/auth/forgot">Forgot your password?</a>
                </FormText>
              </FormGroup>
              <div className="my-3">
                <Button type="submit" color="success" className="mx-1">
                  Login
                </Button>
                <Button type="reset" color="warning" className="mx-1">
                  Cancel
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </LayoutCentered>
  )
}
