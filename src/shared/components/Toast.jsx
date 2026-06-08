function Toast({ message }) {
  if (!message) return null
  return (
    <div className="pk-toast">
      {message}
    </div>
  )
}
export default Toast
