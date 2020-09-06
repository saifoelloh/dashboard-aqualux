import { fetchapi } from 'utils/api'
import { DataTable } from 'components/molecules'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'

const DashboardHome = () => {
  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState(true)
  const header = ['nama', 'jabatan', 'telepon']

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
    <Card>
      <CardHeader>Dashboard</CardHeader>
      <CardBody>
        {loading ? (
          <h1>loading...</h1>
        ) : (
          <DataTable
            header={header}
            rawData={collection}
            url="/dashboard/admin/"
          />
        )}
      </CardBody>
    </Card>
  )
}

export default DashboardHome
