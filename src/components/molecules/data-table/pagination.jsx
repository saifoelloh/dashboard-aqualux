import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const DataTablePagination = ({
  body = [],
  currentPage = -1,
  setCurrentPage = () => '',
}) => (
  <Pagination>
    <PaginationItem>
      <PaginationLink first onClick={() => setCurrentPage(0)} />
    </PaginationItem>
    {body.map((paginate, id) => (
      <PaginationItem
        key={id}
        active={id === currentPage}
        onClick={() => setCurrentPage(id)}
      >
        <PaginationLink>{id + 1}</PaginationLink>
      </PaginationItem>
    ))}
    <PaginationItem>
      <PaginationLink last onClick={() => setCurrentPage(body.length - 1)} />
    </PaginationItem>
  </Pagination>
)

export default DataTablePagination
