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

const DashboardPackageEdit = () => {
  const history = useHistory()
  const id = history.location.state?.id
  const [defaultValue, setDefaultValue] = useState({})
  const [loading, setLoading] = useState(true)
  const paket = useForm(defaultValue)
  const fetchData = async (id = -1) => {
    try {
      const { status, payload } = await fetchapi('get', `/package/${id}/edit`)
      if (!status.success) {
        history.push('/dashboard/package', {
          message: status.message,
          status: 'error',
        })
      }
      return payload[0]
    } catch (error) {
      history.push('/dashboard/package', {
        message: error.message,
        status: 'error',
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const body = { ...defaultValue, ...paket.value }
      const { status } = await fetchapi('put', `/package/${id}`, body)
      history.push('/dashboard/package', {
        message: status.message,
        status: status.success ? 'success' : 'error',
      })
    } catch (error) {
      history.push('/dashboard/package', {
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
            <CardText>Edit Package</CardText>
          </Col>
          <Col className="text-right">
            <Button
              color="primary"
              size="sm"
              tag={Link}
              to="/dashboard/package"
            >
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
                <Label>Nama</Label>
                <Input
                  type="text"
                  name="nama"
                  defaultValue={defaultValue.nama}
                  onChange={paket.changeHandler}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Harga</Label>
                <Input
                  type="number"
                  name="harga"
                  defaultValue={defaultValue.harga}
                  onChange={paket.changeHandler}
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

export default DashboardPackageEdit
