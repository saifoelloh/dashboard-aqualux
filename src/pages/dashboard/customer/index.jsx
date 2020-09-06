import { fetchapi } from 'utils/api'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { LoadingCard } from 'components/layouts'
import { DataTable } from 'components/molecules'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, CardBody, CardHeader, CardText, Col, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

const DashboardCustomer = () => {
  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState(true)
  const header = ['nama', 'telepon', 'email', 'alamat']

  const fetchData = async () => {
    try {
      const { status, payload } = await fetchapi('get', '/customer')
      if (!status.success) {
        throw Error(status.message)
      }
      return payload
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (loading) {
      fetchData()
        .then((resp) => setCollection(resp))
        .then(() => setLoading(!loading))
        .catch((error) => console.error({ error }))
    }
  }, [loading])

  return (
    <LoadingCard loading={loading}>
      <CardHeader>
        <Row className="my-0">
          <Col>
            <CardText>Customer</CardText>
          </Col>
          <Col className="text-right">
            <Button
              color="primary"
              size="sm"
              tag={Link}
              to="/dashboard/customer/create"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="text-center align-content-center">
        <DataTable header={header} rawData={collection} url="customer/" />
      </CardBody>
    </LoadingCard>
  )
}

export default DashboardCustomer
