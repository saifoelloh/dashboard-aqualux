import { fetchapi } from 'utils/api'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { LoadingCard } from 'components/layouts'
import { DataTable } from 'components/molecules'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, CardBody, CardHeader, CardText, Col, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

const DashboardOrder = () => {
  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState(true)
  const header = ['kode', 'jenis_marketing', 'jenis_pembayaran', 'tanggal']

  const fetchData = async () => {
    try {
      const { status, payload } = await fetchapi('get', '/order')
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
            <CardText>Order</CardText>
          </Col>
          <Col className="text-right">
            <Button
              color="primary"
              size="sm"
              tag={Link}
              to="/dashboard/order/create"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="text-center align-content-center">
        <DataTable header={header} rawData={collection} url="order/" />
      </CardBody>
    </LoadingCard>
  )
}

export default DashboardOrder
