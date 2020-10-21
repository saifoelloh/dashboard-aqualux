import { fetchapi } from 'utils/api'
import { DataTable } from 'components/molecules'
import React, { useEffect, useState } from 'react'
import { DashboardCard } from 'components/template'

const DashboardHome = () => {
  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState(true)
  const header = [
    { name: 'nama', value: 'nama_customer' },
    { name: 'kode', value: 'kode' },
    { name: 'jenis_marketing', value: 'jenis_marketing' },
  ]

  const fetchData = async () => {
    try {
      const { payload } = await fetchapi('get', '/order')
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
    <DashboardCard loading={loading} header={{ title: 'Dashboard' }}>
      <DataTable header={header} body={collection} url="/dashboard/admin/" />
    </DashboardCard>
  )
}

export default DashboardHome
