import { fetchapi } from 'utils/api'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { DashboardCard } from 'components/template'
import { DataTable } from 'components/molecules'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

const DashboardPackage = () => {
  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState(true)
  const header = [
    {
      name: 'nama',
      value: 'nama',
    },
    {
      name: 'harga',
      value: 'harga',
      format: (props) =>
        `Rp ${Intl.NumberFormat('id-ID').format(parseInt(props))}`,
    },
  ]

  const fetchData = async () => {
    try {
      const { status, payload } = await fetchapi('get', '/package')
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
        title: 'Package',
        CallToAction: () => (
          <Button
            color="primary"
            size="sm"
            tag={Link}
            to="/dashboard/package/create"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add
          </Button>
        ),
      }}
    >
      <DataTable header={header} body={collection} url="package/" />
    </DashboardCard>
  )
}

export default DashboardPackage
