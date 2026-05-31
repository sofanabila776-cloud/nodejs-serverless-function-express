import { ORDER_STATUS } from "../constants/orderStatus"

export const getCurrentOrderDateTime = () => {
  const now = new Date()

  const date = String(now.getDate()).padStart(2, "0")
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")

  return `${date}-${month}-${year} ${hours}:${minutes}`
}

export function createOrder({
  selectedArtist,
  selectedProduct,
  quantity,
  description,
  currentBuyerName,
  currentUser,
}) {
  return {
    id: Date.now(),
    artistId: selectedArtist?.id,
    artist: selectedArtist?.name,
    buyer: currentBuyerName,
    buyerId: currentUser?.id || null,
    buyerEmail: currentUser?.email || "",
    product: selectedProduct.tag,
    productCoverImageUrl: selectedProduct.coverImageUrl || "",
    priceRange: selectedProduct.price,
    totalPrice: null,
    quantity,
    description,
    status: ORDER_STATUS.WAITING,
    createdAt: getCurrentOrderDateTime(),
    rejectedAt: null,
    cancelledAt: null,
    acceptedAt: null,
    paymentConfirmedAt: null,
    processedAt: null,
    resultUploadedAt: null,
    revisionRequestedAt: null,
    revisionUploadedAt: null,
    approvedAt: null,
    completedAt: null,
    resultLink: "",
    revisionNote: "",
    revisionLink: "",
    finalLink: "",
  }
}

export function updateOrderById(orders, id, changes) {
  return orders.map((order) =>
    order.id === id
      ? {
          ...order,
          ...changes,
        }
      : order
  )
}

export function updateSelectedOrderById(prevOrder, id, changes) {
  return prevOrder?.id === id
    ? {
        ...prevOrder,
        ...changes,
      }
    : prevOrder
}