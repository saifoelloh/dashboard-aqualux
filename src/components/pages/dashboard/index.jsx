import {
  DashboardBreadcrumbs,
  DashboardSidebar,
} from 'components/molecules/dashboard'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Col, Container, Row } from 'reactstrap'

import DashboardRoute from './routes'

const Dashboard = () => {
  return (
    <Row className="hv-100 m-0 align-items-stretch">
      <Col md="2" className="h-100 p-0">
        <Card className="h-100 border-0 bg-info">
          <DashboardSidebar />
        </Card>
      </Col>
      <Col md="10" className="h-100 p-0 overflow-auto">
        <Row className="h-100 m-0">
          <Col xs="12">
            <Container fluid className="h-100 py-2">
              <DashboardBreadcrumbs />
              <DashboardRoute />
            </Container>
          </Col>
          <Col xs="12" className="align-self-end py-3">
            <Container fluid className="position-fixed-bottom">
              Created with <FontAwesomeIcon icon={faHeart} color="red" /> by
              <a
                href="https://saifoelloh.netlifyapp.com"
                className="text-decoration-none mx-1"
                target="__blank"
              >
                Kreativisia
              </a>
            </Container>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Dashboard
