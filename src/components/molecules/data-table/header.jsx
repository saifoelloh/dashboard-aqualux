import React from 'react'

const DataTableHeader = ({ header = [{}], sortedBy = () => '' }) => (
  <thead className="text-capitalize">
    <tr>
      {header.map((head, index) => (
        <th
          key={index}
          onClick={() => sortedBy(head.value, index)}
          style={{ cursor: 'pointer' }}
        >
          {head.name}
        </th>
      ))}
      <th>action</th>
    </tr>
  </thead>
)

export default DataTableHeader
