import { fetchapi } from 'utils/api'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { DashboardCard } from 'components/template'
import { DataTable } from 'components/molecules'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

const DashboardCustomer = () => {
  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState(true)
  const header = [
    {
      name: 'nama',
      value: 'nama',
    },
    {
      name: 'telepon',
      value: 'telepon',
    },
    {
      name: 'email',
      value: 'email',
    },
    {
      name: 'alamat',
      value: 'alamat',
    },
  ]

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
    <DashboardCard
      loading={loading}
      header={{
        title: 'Customer',
        CallToAction: () => (
          <Button
            color="primary"
            size="sm"
            tag={Link}
            to="/dashboard/customer/create"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add
          </Button>
        ),
      }}
    >
      <DataTable header={header} body={collection} url="customer/" />
    </DashboardCard>
  )
}

export default DashboardCustomer
