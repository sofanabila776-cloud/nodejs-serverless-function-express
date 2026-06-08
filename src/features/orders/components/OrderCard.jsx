import { ORDER_STATUS } from "../constants/orderStatus"

const STATUS_INFO = {
  cancelled:  { text: "Dibatalkan",  cls: "pk-status pk-status-cancelled" },
  completed:  { text: "Selesai",     cls: "pk-status pk-status-completed" },
  revision:   { text: "Revisi",      cls: "pk-status pk-status-revision" },
  process:    { text: "Diproses",    cls: "pk-status pk-status-process" },
  unpaid:     { text: "Belum Dibayar", cls: "pk-status pk-status-waiting" },
  waiting:    { text: "Menunggu",    cls: "pk-status pk-status-waiting" },
  incoming:   { text: "Pesanan Masuk", cls: "pk-status pk-status-process" },
}

function OrderCard({ role = "buyer", order = {}, cancelOrder = () => {}, setSelectedOrder = () => {}, setCurrentPage = () => {} }) {
  const id           = order?._id || order?.id
  const artist       = order?.artist || "Unknown Artist"
  const buyer        = order?.buyer || "Unknown Buyer"
  const displayName  = role === "artist" ? buyer : artist
  const product      = order?.product || "Unknown Product"
  const productImg   = order?.productCoverImageUrl || ""
  const quantity     = order?.quantity || 1
  const price        = order?.priceRange || order?.price || "-"
  const totalPrice   = order?.totalPrice || null
  const description  = order?.description || "-"
  const status       = order?.status || ORDER_STATUS.WAITING

  const isCancelled  = status === ORDER_STATUS.CANCELLED_BY_BUYER || status === ORDER_STATUS.REJECTED_BY_ARTIST || status === "cancelled"
  const isWaiting    = status === ORDER_STATUS.WAITING || status === "waiting"
  const isUnpaid     = status === ORDER_STATUS.ACCEPTED || status === ORDER_STATUS.BUYER_CONFIRMED_PAYMENT
  const isProcessed  = status === ORDER_STATUS.PAID_CONFIRMED || status === ORDER_STATUS.RESULT_UPLOADED
  const isRevision   = status === ORDER_STATUS.REVISION_REQUESTED || status === ORDER_STATUS.REVISION_UPLOADED
  const isCompleted  = status === ORDER_STATUS.COMPLETED || status === ORDER_STATUS.APPROVED_BY_BUYER
  const showTotal    = Boolean(totalPrice) && !isCancelled && (isUnpaid || isProcessed || isRevision || isCompleted)

  const statusKey = isCancelled ? "cancelled" : isCompleted ? "completed" : isRevision ? "revision" : isProcessed ? "process" : isUnpaid ? "unpaid" : role === "artist" ? "incoming" : "waiting"
  const { text: statusText, cls: statusCls } = STATUS_INFO[statusKey] || STATUS_INFO.waiting

  const shortDesc = description.length > 80 ? description.slice(0, 80) + "…" : description

  return (
    <div
      className="pk-order-card"
      onClick={() => { setSelectedOrder(order); setCurrentPage("orderDetail") }}
      style={{ cursor: "pointer" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: "var(--text-dark)" }}>{displayName}</p>
        <span className={statusCls}>{statusText}</span>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        {/* IMAGE */}
        <div style={{ width: 100, height: 70, borderRadius: "var(--radius-sm)", overflow: "hidden", background: "var(--gray-light)", flexShrink: 0, border: "2px solid var(--gray-mid)" }}>
          {productImg && <img src={productImg} alt={product} style={{ width: "100%", height: "100%", objectFit: "contain" }} />}
        </div>

        {/* INFO */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dark)", marginBottom: 4 }}>
            {product} <span style={{ color: "var(--gray-text)", fontWeight: 400 }}>×{quantity}</span>
          </p>
          <p style={{ fontSize: 13, color: "var(--blue-primary)", fontWeight: 600, marginBottom: 6 }}>{price}</p>
          <p style={{ fontSize: 13, color: "var(--gray-text)", lineHeight: 1.4 }}>{shortDesc}</p>
        </div>
      </div>

      {role === "buyer" && !isCancelled && isWaiting && (
        <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={(e) => { e.stopPropagation(); cancelOrder(id) }}
            className="pk-btn pk-btn-ghost"
            style={{ height: 36, fontSize: 13 }}
          >
            Batalkan
          </button>
        </div>
      )}

      {showTotal && (
        <div style={{ marginTop: 16, padding: "12px 16px", background: "var(--gray-light)", borderRadius: "var(--radius-sm)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "var(--gray-text)" }}>{role === "buyer" ? "Total dari Artist" : "Total"}</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: "var(--blue-primary)" }}>{totalPrice}</span>
        </div>
      )}
    </div>
  )
}

export default OrderCard
