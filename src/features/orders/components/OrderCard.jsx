import { ORDER_STATUS } from "../constants/orderStatus"

function OrderCard({
  role = "buyer",
  order = {},
  cancelOrder = () => {},
  setSelectedOrder = () => {},
  setCurrentPage = () => {},
}) {
  const id = order?.id
  const artist = order?.artist || "Unknown Artist"
  const buyer = order?.buyer || "Unknown Buyer"
  const displayName = role === "artist" ? buyer : artist
  const product = order?.product || "Unknown Product"
  const quantity = order?.quantity || 1

  const price =
    order?.priceRange ||
    order?.price ||
    "-"

  const totalPrice = order?.totalPrice || null

  const description = order?.description || "-"
  const status = order?.status || ORDER_STATUS.WAITING

  const isCancelled =
    status === ORDER_STATUS.CANCELLED_BY_BUYER ||
    status === ORDER_STATUS.REJECTED_BY_ARTIST ||
    status === "cancelled"

  const isWaiting =
    status === ORDER_STATUS.WAITING ||
    status === "waiting"

  const isUnpaid =
    status === ORDER_STATUS.ACCEPTED ||
    status === ORDER_STATUS.BUYER_CONFIRMED_PAYMENT

  const isProcessed =
    status === ORDER_STATUS.PAID_CONFIRMED ||
    status === ORDER_STATUS.RESULT_UPLOADED

  const statusText = isCancelled
    ? "Dibatalkan"
    : isProcessed
      ? "Diproses"
      : isUnpaid
        ? "Belum Dibayar"
        : "Menunggu persetujuan"

  const shortDescription =
    description.length > 60
      ? description.slice(0, 60) + "..."
      : description

  return (
    <div
      onClick={() => {
        setSelectedOrder(order)
        setCurrentPage("orderDetail")
      }}
      className="border-[3px] border-[#D9D9D9] p-5 rounded-[18px] cursor-pointer"
    >
      <div className="flex justify-end">
        <p className="text-[16px] text-yellow-500">
          {statusText}
        </p>
      </div>

      <div className="mt-1">
        <div className="flex gap-5">
          <div className="w-[293px] h-[133px] border-[3px] border-black rounded-[18px] flex-shrink-0" />

          <div className="flex flex-col justify-center min-w-0 flex-1">
            <p className="text-[20px]">
              {displayName}
            </p>

            <p className="text-[20px] mt-1">
              {product}
              &nbsp; x{quantity}
              &nbsp; {price}
            </p>

            <p className="text-[16px] text-[#555555] mt-1 max-w-[520px]">
              {shortDescription}
            </p>
          </div>
        </div>

        {role === "buyer" && !isCancelled && isWaiting && (
          <div className="w-full flex justify-end mt-5">
            <button
              onClick={(e) => {
                e.stopPropagation()
                cancelOrder(id)
              }}
              className="w-[130px] h-[46px] bg-black text-white rounded-[12px] text-[20px]"
            >
              Batalkan
            </button>
          </div>
        )}

        {(isUnpaid || isProcessed) && totalPrice && (
          <div className="-mx-5 -mb-5 mt-5 bg-[#D9D9D9] px-10 py-5 text-[24px]">
            {role === "buyer" ? "Total dari Artist" : "Total"}: {totalPrice}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderCard