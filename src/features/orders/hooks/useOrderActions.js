import { ORDER_STATUS } from "../constants/orderStatus"

import {
  getCurrentOrderDateTime,
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
      cancelledAt: getCurrentOrderDateTime(),
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
      rejectedAt: getCurrentOrderDateTime(),
      cancelledAt: getCurrentOrderDateTime(),
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
      acceptedAt: getCurrentOrderDateTime(),
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
    paymentConfirmedAt: getCurrentOrderDateTime(),
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
      processedAt: getCurrentOrderDateTime(),
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
      resultUploadedAt: getCurrentOrderDateTime(),
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
    revisionUploadedAt: getCurrentOrderDateTime(),
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
    revisionRequestedAt: getCurrentOrderDateTime(),
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
    completedAt: getCurrentOrderDateTime(),
  }

  setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))

  setSelectedOrder((prevOrder) =>
    updateSelectedOrderById(prevOrder, id, changes)
  )

  setActiveSidebar("orders")
  setActiveOrderStatus("completed")

  showToast("Pesanan berhasil diselesaikan", 5000)
}

  const updatePaymentProofLink = (id, paymentProofLink) => {
  const changes = {
    paymentProofLink,
  }

  setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))
  setSelectedOrder((prevOrder) =>
    updateSelectedOrderById(prevOrder, id, changes)
  )
  showToast("Link bukti pembayaran berhasil diganti", 5000)
}

const updateResultLink = (id, resultLink) => {
  const changes = {
    resultLink,
  }

  setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))
  setSelectedOrder((prevOrder) =>
    updateSelectedOrderById(prevOrder, id, changes)
  )
  showToast("Link hasil pesanan berhasil diganti", 5000)
}

const updateRevisionLink = (id, revisionLink) => {
  const changes = {
    revisionLink,
  }

  setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))
  setSelectedOrder((prevOrder) =>
    updateSelectedOrderById(prevOrder, id, changes)
  )
  showToast("Link hasil revisi berhasil diganti", 5000)
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
    updatePaymentProofLink,
    updateResultLink,
    updateRevisionLink,
  }
}