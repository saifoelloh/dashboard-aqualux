import { fetchapi } from 'utils/api'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { DataTable } from 'components/molecules'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { DashboardCard } from 'components/template'

const DashboardOrder = () => {
  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState(true)
  const header = [
    {
      name: 'kode',
      value: 'kode',
    },
    {
      name: 'tanggal',
      value: 'tanggal',
      format: (props) =>
        Intl.DateTimeFormat('en-GB').format(Date.parse(props)),
    },
    {
      name: 'customer',
      value: 'customers',
      format: (props) => props['nama'],
    },
    {
      name: 'cabang',
      value: 'branchs',
      format: (props) => props['nama'],
    },
    {
      name: 'paket',
      value: 'packages',
      format: (props) => props['nama'],
    },
    {
      name: 'marketing',
      value: 'jenis_marketing',
    },
    {
      name: 'pembayaran',
      value: 'jenis_pembayaran',
    },
  ]

  const fetchData = async () => {
    try {
      const { payload: data } = await fetchapi('get', '/order')
      return data.data
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
  })

  return (
    <DashboardCard
      loading={loading}
      header={{
        title: 'Order',
        CallToAction: () => (
          <Button
            color="primary"
            size="sm"
            tag={Link}
            to="/dashboard/order/create"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add
          </Button>
        ),
      }}
    >
      <DataTable header={header} body={collection} url="order/" />
    </DashboardCard>
  )
}

export default DashboardOrder
