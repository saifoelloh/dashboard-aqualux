import swal from 'sweetalert'

const initialState = {
  title: 'Are you sure ?',
  icon: 'success',
  closeOnClickOutside: false,
  closeOnEsc: false,
  buttons: ['no', 'yes'],
}

export default (config = initialState, onConfirm) => {
  const confirmAction = async (args) => {
    const result = await swal({ ...initialState, ...config })
    if (result) {
      await onConfirm(args)
    }
  }
  return confirmAction
}
