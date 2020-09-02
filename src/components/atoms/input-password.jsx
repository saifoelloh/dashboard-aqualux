import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'

export default ({ name, changeHandler }) => {
  const [inputType, setInputType] = useState(true)

  const handleClick = () => setInputType(!inputType)

  return (
    <InputGroup>
      <Input
        type={inputType ? 'password' : 'text'}
        name={name}
        onChange={changeHandler}
        className="border-right-0"
      />
      <InputGroupAddon addonType="append">
        <InputGroupText
          className="h-100 bg-white border-left-0 rounded-0"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={inputType ? faEye : faEyeSlash} />
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}
