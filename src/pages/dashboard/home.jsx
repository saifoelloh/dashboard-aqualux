import { DataTable } from 'components/molecules'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'

import { fetchapi } from 'utils/api'

const DashboardHome = () => {
  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState(true)
  const header = ['title', 'type', 'episodes', 'score', 'members']

  const fetchData = async () => {
    try {
      const { data } = await fetchapi('get', '/user')
      console.log({ data })
      return data
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (collection.length === 0) {
      fetchData()
        .then((resp) => setCollection(resp))
        .then(() => setLoading(!loading))
        .catch((error) => console.error({ error }))
    }
  })

  return (
    <Card>
      <CardHeader>Dashboard</CardHeader>
      <CardBody>
        {loading ? (
          <h1>loading...</h1>
        ) : (
          <DataTable header={header} data={collection} />
        )}
      </CardBody>
    </Card>
  )
}

export default DashboardHome
