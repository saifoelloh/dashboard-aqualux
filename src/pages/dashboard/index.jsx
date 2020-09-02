import React from 'react'
import { Card, Col, Container, Row } from 'reactstrap'

import DashboardRoute from './routes'
import {
  DashboardBreadcrumbs,
  DashboardSidebar,
} from 'components/molecules/dashboard'

const Dashboard = () => {
  return (
    <Row className="hv-100 m-0 align-items-stretch">
      <Col md="2" className="h-100 p-0">
        <Card className="h-100 border-0 bg-info">
          <DashboardSidebar />
        </Card>
      </Col>
      <Col md="10" className="h-100 p-0">
        <Container fluid className="h-100 py-2 overflow-auto">
          <Row className="h-100 m-0">
            <Col xs="12">
              <DashboardBreadcrumbs />
              <DashboardRoute />
            </Col>
            <Col xs="12" className="align-self-end">
              <div className="position-fixed-bottom">
                <h2>footer</h2>
              </div>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  )
}

export default Dashboard
