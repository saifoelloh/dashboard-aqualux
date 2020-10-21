import { faReply } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useHistory } from 'react-router-dom'
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'

import { fetchapi } from 'utils/api'
import { useForm } from 'utils/hooks'
import { DashboardCard } from 'components/template'

const DashboardAdminCreate = () => {
  const user = useForm({})
  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { status } = await fetchapi('post', '/user', { ...user.value })
      history.push('/dashboard/admin', {
        message: status.message,
        status: status.success ? 'success' : 'error',
      })
    } catch (error) {
      console.log(error)
      history.push('/dashboard/admin', {
        message: error.message,
        status: 'error',
      })
    }
  }
  return (
    <DashboardCard
      header={{
        title: 'Add Admin',
        CallToAction: () => (
          <Button color="primary" size="sm" tag={Link} to="/dashboard/admin">
            <FontAwesomeIcon icon={faReply} className="mr-2" />
            Back
          </Button>
        ),
      }}
    >
      <Row>
        <Col md="6">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="nama"
                onChange={user.changeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                onChange={user.changeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone</Label>
              <Input
                type="text"
                name="telepon"
                onChange={user.changeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Position</Label>
              <Input
                type="text"
                name="jabatan"
                onChange={user.changeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Address</Label>
              <Input
                type="textarea"
                name="alamat"
                onChange={user.changeHandler}
                required
              />
            </FormGroup>
            <ButtonGroup>
              <Button type="submit" color="success">
                Submit
              </Button>
              <Button type="reset" color="warning">
                Reset
              </Button>
            </ButtonGroup>
          </Form>
        </Col>
      </Row>
    </DashboardCard>
  )
}

export default DashboardAdminCreate
