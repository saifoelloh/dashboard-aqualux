import { faEdit } from '@fortawesome/free-regular-svg-icons'
import {
  faClipboardList,
  faSearch,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useHistory } from 'react-router-dom'
import {
  Button,
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
import swal from 'sweetalert'

import { fetchapi } from '../../utils/api/index.js'

export default ({ header = [], rawData = [], url = '' }) => {
  const finalURL = `/dashboard/${url}`
  const history = useHistory()
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(10)
  const [page, setPage] = useState(0)
  const [items, setItems] = useState([...rawData])
  const totalPages = Math.round(
    rawData.length / show +
      (rawData.length % 10 > 0 && rawData.length > 10 ? 1 : 0),
  )
  const paginations = Array(totalPages).fill(0)
  const sortedBy = (field = '') => {
    const temp = _.sortBy(rawData, [field])
    setItems([...temp])
  }

  const removeData = async (id = -1) => {
    try {
      const { status } = await fetchapi('delete', `/${url + id}`)
      history.go(finalURL, {
        message: status.message,
        status: status.success ? 'success' : 'error',
      })
    } catch (error) {
      history.push(finalURL, {
        message: error.message,
        status: 'error',
      })
    }
  }

  const modalConfirmation = async (id = -1) => {
    const confirm = await swal('Are you sure delete this data ?', {
      buttons: ['no', 'yes'],
    })
    if (confirm) {
      await removeData(id)
    }
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
        <InputGroup className="w-50 ml-auto" hidden={true}>
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
                <th
                  key={index}
                  onClick={() => sortedBy(headRow)}
                  style={{ cursor: 'pointer' }}
                >
                  {headRow.split('_').join(' ')}
                </th>
              ))}
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((row, id) => id >= show * page && id < show * (page + 1))
              .map((row, index) => (
                <tr key={index}>
                  <td>{show * page + (index + 1)}</td>
                  {header.map((fieldName, id) => (
                    <td key={id}>{row[fieldName]}</td>
                  ))}
                  <td>
                    <Link
                      to={{
                        pathname: `${finalURL}show`,
                        state: { id: row['id'] },
                      }}
                    >
                      <Button size="sm" color="primary">
                        <FontAwesomeIcon icon={faClipboardList} />
                      </Button>
                    </Link>
                    <Link
                      to={{
                        pathname: `${finalURL}edit`,
                        state: { id: row['id'] },
                      }}
                    >
                      <Button size="sm" color="success">
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => modalConfirmation(row['id'])}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
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
