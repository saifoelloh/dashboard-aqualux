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

const DashboardBranchCreate = () => {
  const branch = useForm({})
  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { status } = await fetchapi('post', '/branch', {
        ...branch.value,
      })
      history.push('/dashboard/branch', {
        message: status.message,
        status: status.success ? 'success' : 'error',
      })
    } catch (error) {
      console.log(error)
      history.push('/dashboard/branch', {
        message: error.message,
        status: 'error',
      })
    }
  }

  return (
    <DashboardCard
      header={{
        title: 'Add Branch',
        CallToAction: () => (
          <Button color="primary" size="sm" tag={Link} to="/dashboard/branch">
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
              <Label>Nama</Label>
              <Input
                type="text"
                name="nama"
                onChange={branch.changeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Alamat</Label>
              <Input
                type="textarea"
                name="alamat"
                onChange={branch.changeHandler}
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

export default DashboardBranchCreate
