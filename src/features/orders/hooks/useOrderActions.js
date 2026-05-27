import { ORDER_STATUS } from "../constants/orderStatus"

import {
  updateOrderById,
  updateSelectedOrderById,
} from "../utils/orderHelpers"

export function useOrderActions({
  setOrders = () => {},
  setSelectedOrder = () => {},
  setCurrentPage = () => {},
  setActiveSidebar = () => {},
  setActiveOrderStatus = () => {},
  showToast = () => {},
}) {
  const cancelOrder = (id) => {
    const changes = {
      status: ORDER_STATUS.CANCELLED_BY_BUYER,
      cancelledAt: "04-04-2026 11:00",
      cancelReason: "Anda membatalkan pesanan",
    }

    setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))
    setSelectedOrder((prevOrder) =>
      updateSelectedOrderById(prevOrder, id, changes)
    )

    showToast("Pesanan dibatalkan", 5000)
  }

  const rejectOrderByArtist = (id) => {
    const changes = {
      status: ORDER_STATUS.REJECTED_BY_ARTIST,
      rejectedAt: "04-04-2026 10:30",
      cancelledAt: "04-04-2026 10:30",
    }

    setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))
    setSelectedOrder((prevOrder) =>
      updateSelectedOrderById(prevOrder, id, changes)
    )

    showToast("Pesanan ditolak artist", 5000)
  }

  const acceptOrderByArtist = (id, totalPrice) => {
    const changes = {
      status: ORDER_STATUS.ACCEPTED,
      totalPrice,
      acceptedAt: "04-04-2026 12:45",
    }

    setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))
    setSelectedOrder((prevOrder) =>
      updateSelectedOrderById(prevOrder, id, changes)
    )

    showToast("Harga berhasil diajukan", 5000)
  }

  const confirmPaymentByBuyer = (id, paymentProofLink) => {
  const changes = {
    status: ORDER_STATUS.BUYER_CONFIRMED_PAYMENT,
    paymentConfirmedAt: "05-04-2026 07:15",
    paymentProofLink,
  }

  setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))
  setSelectedOrder((prevOrder) =>
    updateSelectedOrderById(prevOrder, id, changes)
  )

  showToast("Konfirmasi pembayaran berhasil dikirim", 5000)
}

  const confirmPaymentByArtist = (id) => {
    const changes = {
      status: ORDER_STATUS.PAID_CONFIRMED,
      processedAt: "05-04-2026 07:15",
    }

    setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))
    setSelectedOrder((prevOrder) =>
      updateSelectedOrderById(prevOrder, id, changes)
    )

    setCurrentPage("profile")
    setActiveSidebar("orders")
    setActiveOrderStatus("artist_process")

    showToast("Pembayaran berhasil dikonfirmasi", 5000)
  }

  const uploadResultByArtist = (id, resultLink) => {
    const changes = {
      status: ORDER_STATUS.RESULT_UPLOADED,
      resultLink,
      resultUploadedAt: "05-04-2026 08:00",
    }

    setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))
    setSelectedOrder((prevOrder) =>
      updateSelectedOrderById(prevOrder, id, changes)
    )

    showToast("Hasil karya berhasil dikirim", 5000)
  }

  const uploadRevisionByArtist = (id, revisionLink) => {
  const changes = {
    status: ORDER_STATUS.REVISION_UPLOADED,
    revisionLink,
    revisionUploadedAt: "07-04-2026 10:38",
  }

  setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))

  setSelectedOrder((prevOrder) =>
    updateSelectedOrderById(prevOrder, id, changes)
  )

  showToast("Hasil revisi berhasil dikirim", 5000)
}

  const requestRevisionByBuyer = (id, revisionDescription, revisionSupportLink = "") => {
  const changes = {
    status: ORDER_STATUS.REVISION_REQUESTED,
    revisionDescription,
    revisionSupportLink,
    revisionRequestedAt: "07-04-2026 08:15",
  }

  setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))

  setSelectedOrder((prevOrder) =>
    updateSelectedOrderById(prevOrder, id, changes)
  )

  setActiveSidebar("orders")
  setActiveOrderStatus("revision")

  showToast("Request revisi berhasil dikirim", 5000)
}

  const completeOrderByBuyer = (id) => {
  const changes = {
    status: ORDER_STATUS.COMPLETED,
    completedAt: "07-04-2026 11:00",
  }

  setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))

  setSelectedOrder((prevOrder) =>
    updateSelectedOrderById(prevOrder, id, changes)
  )

  setActiveSidebar("orders")
  setActiveOrderStatus("completed")

  showToast("Pesanan berhasil diselesaikan", 5000)
}

  return {
    cancelOrder,
    rejectOrderByArtist,
    acceptOrderByArtist,
    confirmPaymentByBuyer,
    confirmPaymentByArtist,
    uploadResultByArtist,
    requestRevisionByBuyer,
    completeOrderByBuyer,
    uploadRevisionByArtist,
  }
}