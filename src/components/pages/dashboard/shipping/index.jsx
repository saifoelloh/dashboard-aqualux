import { fetchapi } from 'utils/api'
import { DashboardCard } from 'components/template'
import { DataTable } from 'components/molecules'
import React, { useEffect, useState } from 'react'

const DashboardShipping = () => {
  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState(true)
  const header = [
    {
      name: 'konfirmasi',
      value: 'konfirmasi',
    },
    {
      name: 'bank',
      value: 'bank',
    },
    {
      name: 'jadwal',
      value: 'jadwal',
      format: (props) =>
        Intl.DateTimeFormat('en-GB').format(Date.parse(props)),
    },
  ]

  const fetchData = async () => {
    try {
      const { status, payload } = await fetchapi('get', '/shipping')
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
    <DashboardCard
      loading={loading}
      header={{
        title: 'Shipping',
      }}
    >
      <DataTable header={header} body={collection} url="shipping/" />
    </DashboardCard>
  )
}

export default DashboardShipping
