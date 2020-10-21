import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  Col,
  Row,
  Progress,
} from 'reactstrap'
import swal from 'sweetalert'

const DashboardCard = ({
  loading = false,
  header = { title: '', CallToAction: null },
  children = null,
}) => {
  const location = useLocation()
  useEffect(() => {
    if (location.state?.message !== undefined && loading) {
      swal({
        text: location.state.message,
        icon: location.state.status,
      })
      location.state = null
    }
  })

  return (
    <Card className="w-100">
      <CardHeader>
        <Row className="my-0">
          <Col>
            <CardText>{header.title}</CardText>
          </Col>
          {header?.CallToAction !== undefined && (
            <Col className="text-right">
              <header.CallToAction />
            </Col>
          )}
        </Row>
      </CardHeader>
      <CardBody className="overflow-auto w-100">
        {loading ? (
          <Progress animated color="primary" value={100} className="w-100" />
        ) : (
          children
        )}
      </CardBody>
    </Card>
  )
}

export default DashboardCard
