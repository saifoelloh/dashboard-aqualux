import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Card, Spinner } from 'reactstrap'
import swal from 'sweetalert'

export default ({ loading = true, children = null }) => {
  const location = useLocation()
  useEffect(() => {
    if (location.state?.message !== undefined && loading) {
      swal({
        text: location.state.message,
        icon: location.state.status,
      })
    }
  })

  return (
    <Card>
      {loading ? (
        <Spinner
          type="grow"
          color="primary"
          size="lg"
          className="text-center my-5"
        />
      ) : (
        children
      )}
    </Card>
  )
}
