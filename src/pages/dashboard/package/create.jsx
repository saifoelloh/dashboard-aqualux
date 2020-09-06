import { faReply } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useHistory } from 'react-router-dom'
import {
  Button,
  ButtonGroup,
  Card,
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

const DashboardPackageCreate = () => {
  const paket = useForm({})
  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { status } = await fetchapi('post', '/package', {
        ...paket.value,
      })
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
  return (
    <Card>
      <CardHeader>
        <Row>
          <Col>
            <CardText>Add Package</CardText>
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
                  onChange={paket.changeHandler}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Harga</Label>
                <Input
                  type="number"
                  name="harga"
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
    </Card>
  )
}

export default DashboardPackageCreate
