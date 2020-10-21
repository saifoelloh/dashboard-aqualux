import { fetchapi } from 'utils/api'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'utils/hooks'
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
import { DashboardCard } from 'components/template'

const DashboardOrderEdit = () => {
  const history = useHistory()
  const id = history.location.state?.id
  const [defaultValue, setDefaultValue] = useState({})
  const [loading, setLoading] = useState(true)
  const order = useForm(defaultValue)
  const fetchData = async (id = -1) => {
    try {
      const { status, payload } = await fetchapi('get', `/order/${id}/edit`)
      if (!status.success) {
        history.push('/dashboard/order', {
          message: status.message,
          status: 'error',
        })
      }
      return payload[0]
    } catch (error) {
      history.push('/dashboard/order', {
        message: error.message,
        status: 'error',
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const body = { ...defaultValue, ...order.value }
      const { status } = await fetchapi('put', `/order/${id}`, body)
      history.push('/dashboard/order', {
        message: status.message,
        status: status.success ? 'success' : 'error',
      })
    } catch (error) {
      history.push('/dashboard/order', {
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
        title: 'Edit Order',
        CallToAction: () => (
          <Button color="primary" size="sm" tag={Link} to="/dashboard/order">
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
              <Label>Kode</Label>
              <Input
                type="text"
                name="kode"
                defaultValue={defaultValue.kode}
                onChange={order.changeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Jenis Marketing</Label>
              <Input
                type="text"
                name="jenis_marketing"
                defaultValue={defaultValue.jenis_marketing}
                onChange={order.changeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Jenis Pembayaran</Label>
              <Input
                type="text"
                name="jenis_pembayaran"
                defaultValue={defaultValue.jenis_pembayaran}
                onChange={order.changeHandler}
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

export default DashboardOrderEdit
