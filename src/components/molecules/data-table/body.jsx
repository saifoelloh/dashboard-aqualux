import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faClipboardList, faTrash } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

const DataTableBody = ({
  body = [{}],
  header = [{}],
  currentPage = -1,
  finalURL = '',
  CustomComponent = null,
  modalConfirmation = () => '',
}) => (
  <tbody>
    {body[currentPage].map((row, index) =>
      CustomComponent !== null ? (
        <CustomComponent data={row} />
      ) : (
        <tr key={index}>
          {header.map((head, id) => (
            <td key={id}>
              {head.format !== undefined
                ? head.format(row[head.value])
                : row[head.value]}
            </td>
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
      ),
    )}
  </tbody>
)

export default DataTableBody
