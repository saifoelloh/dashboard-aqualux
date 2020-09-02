import { useForm } from 'utils/hooks'
import { LayoutCentered } from 'components/layouts'
import React from 'react'
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

export default () => {
  const user = useForm({})
  const history = useHistory()
  const location = useLocation()
  const from = location.state?.from || { pathname: '/dashboard/' }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ history, from })
    history.replace(from)
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
