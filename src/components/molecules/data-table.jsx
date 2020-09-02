import { faEdit } from '@fortawesome/free-regular-svg-icons'
import {
  faClipboardList,
  faSearch,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import {
  Button,
  ButtonGroup,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from 'reactstrap'

export default ({ data = [], header = [] }) => {
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(10)
  const [page, setPage] = useState(0)
  const [items, setItems] = useState([...data])
  const paginations = Array(Math.round(data.length / show)).fill(0)
  const sortedBy = (field = '') => {
    setItems([..._.sortBy(data, [field])])
  }

  return (
    <Row className="m-0">
      <Col xs="4">
        <Input
          type="select"
          className="w-auto"
          onChange={({ target }) => setShow(target.value)}
        >
          {[10, 30, 50].map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </Input>
      </Col>
      <Col>
        <InputGroup className="w-50 ml-auto">
          <Input
            type="text"
            placeholder="seach..."
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
          <InputGroupAddon addonType="append">
            <Button color="secondary">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Col>
      <Col xs="12">
        <Table className="text-center my-2" bordered hover>
          <thead className="text-capitalize">
            <tr>
              <th>no</th>
              {header.map((headRow, index) => (
                <th key={index} onClick={() => sortedBy(headRow)}>
                  {headRow}
                </th>
              ))}
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter(
                (rowData, id) => id >= show * page && id < show * (page + 1),
              )
              .map((rowData, index) => (
                <tr key={index}>
                  <td>{show * page + (index + 1)}</td>
                  {header.map((fieldName, id) => (
                    <td key={id}>{rowData[fieldName]}</td>
                  ))}
                  <td>
                    <ButtonGroup>
                      <Link to={() => `/dashboard/admin/${index}`}>
                        <Button size="sm" color="primary">
                          <FontAwesomeIcon icon={faClipboardList} />
                        </Button>
                      </Link>
                      <Button size="sm" color="success">
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button size="sm" color="danger">
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
      <Col>
        <Pagination>
          {paginations.map((paginate, id) => (
            <PaginationItem
              key={id}
              active={id === page}
              onClick={() => setPage(id)}
            >
              <PaginationLink>{id + 1}</PaginationLink>
            </PaginationItem>
          ))}
        </Pagination>
      </Col>
    </Row>
  )
}
