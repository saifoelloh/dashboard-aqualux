import { useState } from 'react'

export default (initialState = {}) => {
  const [value, setValue] = useState(initialState)

  const changeHandler = (e) => {
    const temp =
      e.target.type === 'checkbox'
        ? e.target.checked
        : e.target.type === 'file'
        ? e.target.files[0]
        : e.target.value
    setValue({ ...value, [e.target.name]: temp })
  }

  return { value, changeHandler }
}
