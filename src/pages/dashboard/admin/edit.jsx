import { faReply } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useHistory } from 'react-router-dom'
import {
  Button,
  ButtonGroup,
  CardBody,
  CardHeader,
  CardText,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'

import { fetchapi } from 'utils/api'
import { useForm } from 'utils/hooks'
import { LoadingCard } from 'components/layouts'

const DashboardAdminEdit = () => {
  const history = useHistory()
  const id = history.location.state?.id
  const [defaultValue, setDefaultValue] = useState({})
  const [loading, setLoading] = useState(true)
  const user = useForm(defaultValue)
  const fetchData = async (id = -1) => {
    try {
      const { status, payload } = await fetchapi('get', `/user/${id}/edit`)
      if (!status.success) {
        history.push('/dashboard/admin', {
          message: status.message,
          status: 'error',
        })
      }
      return payload[0]
    } catch (error) {
      history.push('/dashboard/admin', {
        message: error.message,
        status: 'error',
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const body = { ...defaultValue, ...user.value }
      const { status } = await fetchapi('put', `/user/${id}`, body)
      history.push('/dashboard/admin', {
        message: status.message,
        status: status.success ? 'success' : 'error',
      })
    } catch (error) {
      history.push('/dashboard/admin', {
        message: error.message,
        status: 'error',
      })
    }
  }

  useEffect(() => {
    if (loading) {
      fetchData(id)
        .then((resp) => setDefaultValue({ ...resp }))
        .catch((error) => console.log(error))
        .finally(() => setLoading(!loading))
    }
  })

  return (
    <LoadingCard loading={loading}>
      <CardHeader>
        <Row>
          <Col>
            <CardText>Edit Admin</CardText>
          </Col>
          <Col className="text-right">
            <Button color="primary" size="sm" tag={Link} to="/dashboard/admin">
              <FontAwesomeIcon icon={faReply} className="mr-2" />
              Back
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="6">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="nama"
                  defaultValue={defaultValue.nama}
                  onChange={user.changeHandler}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  defaultValue={defaultValue.email}
                  onChange={user.changeHandler}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone</Label>
                <Input
                  type="text"
                  name="telepon"
                  defaultValue={defaultValue.telepon}
                  onChange={user.changeHandler}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Position</Label>
                <Input
                  type="text"
                  name="jabatan"
                  defaultValue={defaultValue.jabatan}
                  onChange={user.changeHandler}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Address</Label>
                <Input
                  type="textarea"
                  name="alamat"
                  defaultValue={defaultValue.alamat}
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
      </CardBody>
    </LoadingCard>
  )
}

export default DashboardAdminEdit
