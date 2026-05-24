import { ORDER_STATUS } from "../constants/orderStatus"

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
    priceRange: selectedProduct.price,
    totalPrice: null,
    quantity,
    description,
    status: ORDER_STATUS.WAITING,
    createdAt: "04-04-2026 09:45",
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