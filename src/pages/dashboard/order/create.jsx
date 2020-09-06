import { fetchapi } from 'utils/api'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'utils/hooks'
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

import { LoadingCard } from '../../../components/layouts/index.js'

const DashboardOrderCreate = () => {
  const order = useForm({})
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [branches, setBranches] = useState([])
  const [customers, setCustomers] = useState([])
  const [packages, setPackages] = useState([])
  const [users, setUsers] = useState([])
  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        fetchapi('get', '/branch'),
        fetchapi('get', '/customer'),
        fetchapi('get', '/package'),
        fetchapi('get', '/user'),
      ])
      return responses
    } catch (error) {
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { status } = await fetchapi('post', '/order', {
        ...order.value,
      })
      history.push('/dashboard/order', {
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

  useEffect(() => {
    if (loading) {
      fetchData()
        .then((responses) => {
          setBranches([...responses[0].payload])
          setCustomers([...responses[1].payload])
          setPackages([...responses[2].payload])
          setUsers([...responses[3].payload])
        })
        .then(() => setLoading(!loading))
    }
  }, [loading])

  return (
    <LoadingCard loading={loading}>
      <CardHeader>
        <Row>
          <Col>
            <CardText>Add Order</CardText>
          </Col>
          <Col className="text-right">
            <Button color="primary" size="sm" tag={Link} to="/dashboard/order">
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
                <Label>Admin</Label>
                <Input
                  type="select"
                  name="user_id"
                  onChange={order.changeHandler}
                  required
                >
                  {users.map((user, id) => (
                    <option key={id} value={user.id}>
                      {`${user.telepon} ${user.nama}`}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Customer</Label>
                <Input
                  type="select"
                  name="customer_id"
                  onChange={order.changeHandler}
                  required
                >
                  {customers.map((customer, id) => (
                    <option key={id} value={customer.id}>
                      {`${customer.telepon} ${customer.nama}`}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Kantor Cabang</Label>
                <Input
                  type="select"
                  name="branch_id"
                  onChange={order.changeHandler}
                  required
                >
                  {branches.map((branch, id) => (
                    <option key={id} value={branch.id}>
                      {branch.nama}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Paket</Label>
                <Input
                  type="select"
                  name="package_id"
                  onChange={order.changeHandler}
                  required
                >
                  {packages.map((paket, id) => (
                    <option key={id} value={paket.id}>
                      {paket.nama}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Jenis Marketing</Label>
                <Input
                  type="text"
                  name="jenis_marketing"
                  onChange={order.changeHandler}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Jenis Pembayaran</Label>
                <Input
                  type="text"
                  name="jenis_pembayaran"
                  onChange={order.changeHandler}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Tanggal</Label>
                <Input
                  type="date"
                  name="tanggal"
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
      </CardBody>
    </LoadingCard>
  )
}

export default DashboardOrderCreate
