import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useConfirmation } from 'utils/hooks'
import { fetchapi } from 'utils/api/index.js'
import _ from 'lodash'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom'
import {
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Table,
} from 'reactstrap'

import DataTableBody from './body'
import DataTableHeader from './header'
import DataTablePagination from './pagination'

const initialValue = {
  header: [
    {
      name: '',
      value: '',
      format: () => '',
      sortBy: '',
    },
  ],
  body: [{}],
}

const DataTable = ({
  header = initialValue.header,
  body = initialValue.body,
  url = '',
  CustomComponent = null,
}) => {
  const finalURL = `/dashboard/${url}`
  const history = useHistory()
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const [stateHeader, setStateHeader] = useState([
    { name: 'no', value: 'no', sortBy: 'asc' },
    ...header.map((head) => ({ ...head, sortBy: 'asc' })),
  ])
  const [stateData, setStateData] = useState([
    ..._.chunk(
      body.map((val, id) => ({ ...val, no: id + 1 })),
      show,
    ),
  ])

  const sortedBy = (field = '', id = -1) => {
    setStateHeader(() => [
      ...stateHeader.map((head, idx) =>
        idx === id
          ? { ...head, sortBy: head.sortBy === 'asc' ? 'desc' : 'asc' }
          : head,
      ),
    ])
    const temp = _.orderBy(_.flatten(stateData), field, stateHeader[id].sortBy)
    setStateData([..._.chunk(temp, show)])
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

  const modalConfirmation = useConfirmation({ icon: 'warning' }, removeData)

  const onChangeShowPage = ({ target }) => {
    setShow(target.value)
    setStateData([..._.chunk(_.flatten(stateData), target.value)])
  }

  return (
    <Row className="m-0">
      <Col xs="4">
        <Input type="select" className="w-auto" onChange={onChangeShowPage}>
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
          <DataTableHeader header={stateHeader} sortedBy={sortedBy} />
          <DataTableBody
            body={stateData}
            header={stateHeader}
            finalURL={finalURL}
            currentPage={currentPage}
            CustomComponent={CustomComponent}
            modalConfirmation={modalConfirmation}
          />
        </Table>
      </Col>
      <Col xs="12">
        <DataTablePagination
          body={stateData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Col>
    </Row>
  )
}

export default DataTable
