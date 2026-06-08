function ProfileConfirmPopup({
  message = "",
  confirmText = "OK",
  cancelText = "Cancel",
  onCancel = () => {},
  onConfirm = () => {},
}) {
  return (
    <div className="pk-overlay" onClick={onCancel}>
      <div className="pk-popup" onClick={(e) => e.stopPropagation()}>
        <p style={{ fontSize: 17, color: "var(--text-dark)", marginBottom: 28, lineHeight: 1.5 }}>
          {message}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={onCancel} className="pk-btn pk-btn-ghost" style={{ minWidth: 100 }}>
            {cancelText}
          </button>
          <button onClick={onConfirm} className="pk-btn pk-btn-danger" style={{ minWidth: 100 }}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
export default ProfileConfirmPopup
