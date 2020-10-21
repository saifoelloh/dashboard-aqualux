import { faReply } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
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

const DashboardCustomerEdit = () => {
  const history = useHistory()
  const id = history.location.state?.id
  const [defaultValue, setDefaultValue] = useState({})
  const [loading, setLoading] = useState(true)
  const customer = useForm(defaultValue)
  const fetchData = async (id = -1) => {
    try {
      const { status, payload } = await fetchapi('get', `/customer/${id}/edit`)
      if (!status.success) {
        history.push('/dashboard/customer', {
          message: status.message,
          status: 'error',
        })
      }
      return payload[0]
    } catch (error) {
      history.push('/dashboard/customer', {
        message: error.message,
        status: 'error',
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const body = { ...defaultValue, ...customer.value }
      const { status } = await fetchapi('put', `/customer/${id}`, body)
      history.push('/dashboard/customer', {
        message: status.message,
        status: status.success ? 'success' : 'error',
      })
    } catch (error) {
      history.push('/dashboard/customer', {
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
    <DashboardCard
      loading={loading}
      header={{
        title: 'Edit Admin',
        CallToAction: () => (
          <Button
            color="primary"
            size="sm"
            tag={Link}
            to="/dashboard/customer"
          >
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
                defaultValue={defaultValue.nama}
                onChange={customer.changeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                defaultValue={defaultValue.email}
                onChange={customer.changeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone</Label>
              <Input
                type="text"
                name="telepon"
                defaultValue={defaultValue.telepon}
                onChange={customer.changeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Address</Label>
              <Input
                type="textarea"
                name="alamat"
                defaultValue={defaultValue.alamat}
                onChange={customer.changeHandler}
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

export default DashboardCustomerEdit
