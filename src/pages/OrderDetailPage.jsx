import { useState } from "react"
import { IoArrowBack } from "react-icons/io5"
import { LuClipboardList } from "react-icons/lu"
import {
  FiX,
  FiDollarSign,
  FiEdit2,
} from "react-icons/fi"

import { ORDER_STATUS } from "../constants/orderStatus"

function OrderDetailPage({
  role = "buyer",
  selectedOrder,
  setCurrentPage,
  cancelOrder,
  rejectOrderByArtist = () => {},
  acceptOrderByArtist = () => {},
  confirmPaymentByBuyer = () => {},
  confirmPaymentByArtist = () => {},
  uploadResultByArtist = () => {},
}) {
  const [showPricePopup, setShowPricePopup] = useState(false)
  const [finalPriceInput, setFinalPriceInput] = useState("0")
  const [showUploadPopup, setShowUploadPopup] = useState(false)
  const [gdriveLink, setGdriveLink] = useState("")

  if (!selectedOrder) {
    return (
      <div className="p-10 text-center">
        Tidak ada order dipilih
      </div>
    )
  }

  const id = selectedOrder?.id
  const artist = selectedOrder?.artist || "Unknown Artist"
  const buyer = selectedOrder?.buyer || "Unknown Buyer"
  const displayName = role === "artist" ? buyer : artist

  const product = selectedOrder?.product || "Unknown Product"

  const price =
    selectedOrder?.priceRange ||
    selectedOrder?.price ||
    "-"

  const totalPrice =
    selectedOrder?.totalPrice ||
    price

  const quantity = selectedOrder?.quantity || 1
  const description = selectedOrder?.description || "-"
  const status = selectedOrder?.status || ORDER_STATUS.WAITING

  const createdAt = selectedOrder?.createdAt || "04-04-2026 09:45"
  const cancelledAt = selectedOrder?.cancelledAt || "04-04-2026 11:00"
  const acceptedAt = selectedOrder?.acceptedAt || "04-04-2026 12:45"
  const paymentConfirmedAt = selectedOrder?.paymentConfirmedAt || "05-04-2026 07:15"
  const processedAt = selectedOrder?.processedAt || "05-04-2026 07:15"
  const resultUploadedAt = selectedOrder?.resultUploadedAt || "05-04-2026 08:00"

  const revisionRequestedAt =
    selectedOrder?.revisionRequestedAt || "07-04-2026 08:15"

  const revisionUploadedAt =
    selectedOrder?.revisionUploadedAt || "07-04-2026 10:38"

  const completedAt =
    selectedOrder?.completedAt ||
    selectedOrder?.approvedAt ||
    "07-04-2026 11:00"

  const isCancelled =
    status === ORDER_STATUS.CANCELLED_BY_BUYER ||
    status === ORDER_STATUS.REJECTED_BY_ARTIST ||
    status === "cancelled"

  const isRejectedByArtist =
    status === ORDER_STATUS.REJECTED_BY_ARTIST

  const isCancelledByBuyer =
    status === ORDER_STATUS.CANCELLED_BY_BUYER ||
    status === "cancelled"

  const isAccepted =
    status === ORDER_STATUS.ACCEPTED

  const isBuyerConfirmedPayment =
    status === ORDER_STATUS.BUYER_CONFIRMED_PAYMENT

  const isUnpaid =
    isAccepted ||
    isBuyerConfirmedPayment

  const isProcessed =
    status === ORDER_STATUS.PAID_CONFIRMED

  const isResultUploaded =
    status === ORDER_STATUS.RESULT_UPLOADED

  const isRevisionRequested =
    status === ORDER_STATUS.REVISION_REQUESTED

  const isRevisionUploaded =
    status === ORDER_STATUS.REVISION_UPLOADED

  const isCompleted =
    status === ORDER_STATUS.COMPLETED ||
    status === ORDER_STATUS.APPROVED_BY_BUYER

  const canCancel =
    status === ORDER_STATUS.WAITING ||
    status === "waiting"

  const cancelSubtitle = isRejectedByArtist
    ? role === "artist"
      ? "Anda menolak pesanan"
      : "Artist menolak pesanan"
    : isCancelledByBuyer
      ? role === "artist"
        ? "Buyer membatalkan pesanan"
        : "Anda membatalkan pesanan"
      : "Pesanan dibatalkan"

  const priceNumber =
    Number(finalPriceInput.replace(/\D/g, "")) || 0

  const receivedAmount = priceNumber - priceNumber * 0.1

  const formatRupiah = (number) => {
    return `Rp${Number(number).toLocaleString("id-ID")}`
  }

  const DummyQR = () => {
    const cells = Array.from({ length: 225 }, (_, index) => {
      const row = Math.floor(index / 15)
      const col = index % 15

      const inTopLeft = row < 5 && col < 5
      const inTopRight = row < 5 && col > 9
      const inBottomLeft = row > 9 && col < 5

      const finder =
        inTopLeft ||
        inTopRight ||
        inBottomLeft

      const randomFill =
        (row * col + row + col) % 3 === 0 ||
        (row + col) % 5 === 0

      const filled = finder || randomFill

      return (
        <div
          key={index}
          className={filled ? "bg-black" : "bg-white"}
        />
      )
    })

    return (
      <div
        className="w-[270px] h-[270px] grid border-[1px] border-black bg-white p-3"
        style={{
          gridTemplateColumns: "repeat(15, 1fr)",
          gridTemplateRows: "repeat(15, 1fr)",
        }}
      >
        {cells}
      </div>
    )
  }

  const handlePriceChange = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "")

    if (!onlyNumbers) {
      setFinalPriceInput("0")
      return
    }

    setFinalPriceInput(
      Number(onlyNumbers).toLocaleString("id-ID")
    )
  }

  const handleAcceptOrder = () => {
    if (priceNumber <= 0) return

    acceptOrderByArtist(id, formatRupiah(priceNumber))
    setShowPricePopup(false)
    setFinalPriceInput("0")
    setCurrentPage("profile")
  }

  const handleUploadResult = () => {
    if (!gdriveLink.trim()) return

    uploadResultByArtist(id, gdriveLink)
    setShowUploadPopup(false)
    setGdriveLink("")
  }

  const headerStatus = isCancelled
    ? "Dibatalkan"
    : isCompleted
      ? "Selesai"
      : isRevisionRequested || isRevisionUploaded
        ? "Revisi"
        : isProcessed || isResultUploaded
          ? "Diproses"
          : isUnpaid
            ? "Belum Dibayar"
            : "Menunggu persetujuan"

  const hasAcceptedAt = Boolean(selectedOrder?.acceptedAt)
  const hasPaymentConfirmedAt = Boolean(selectedOrder?.paymentConfirmedAt)
  const hasProcessedAt = Boolean(selectedOrder?.processedAt)
  const hasResultUploadedAt = Boolean(selectedOrder?.resultUploadedAt)

  const TimelineMarker = ({
    type = "icon",
    active = false,
    icon,
  }) => {
    if (type === "dot") {
      return (
        <div className="w-[42px] flex justify-center flex-shrink-0">
          <div
            className={
              active
                ? "w-[16px] h-[16px] rounded-full bg-yellow-500 mt-3"
                : "w-[16px] h-[16px] rounded-full bg-[#9E9E9E] mt-3"
            }
          />
        </div>
      )
    }

    return (
      <div
        className={
          active
            ? "w-[42px] h-[42px] rounded-full border-[3px] border-yellow-500 text-yellow-500 flex items-center justify-center flex-shrink-0 bg-[#F5F5F5]"
            : "w-[42px] h-[42px] rounded-full border-[3px] border-[#9E9E9E] text-[#9E9E9E] flex items-center justify-center flex-shrink-0 bg-[#F5F5F5]"
        }
      >
        {icon}
      </div>
    )
  }

  const TimelineStep = ({ step }) => {
    const textColor = step.active
      ? "text-yellow-500"
      : "text-[#9E9E9E]"

    return (
      <div className="relative z-10 flex gap-6">
        <TimelineMarker
          type={step.type}
          active={step.active}
          icon={step.icon}
        />

        <p className="w-[215px] text-[20px] whitespace-nowrap mt-2 text-black">
          {step.date}
        </p>

        <div className="flex-1 mt-2 min-w-0">
          <p
            className={
              step.bold === false
                ? `text-[20px] leading-[24px] ${textColor}`
                : `text-[20px] font-semibold leading-[24px] ${textColor}`
            }
          >
            {step.title}
          </p>

          {step.subtitles?.map((subtitle) => (
            <p
              key={subtitle}
              className={`text-[20px] leading-[24px] mt-[2px] ${textColor}`}
            >
              {subtitle}
            </p>
          ))}

          {step.linkText && (
            <a
              href={step.linkHref || "#"}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                if (!step.linkHref) e.preventDefault()
              }}
              className="inline-block text-[20px] text-[#09027C] underline mt-[2px]"
            >
              {step.linkText}
            </a>
          )}

          {step.extra}

          {step.actions}
        </div>
      </div>
    )
  }

  const timelineSteps = []

  const addCreatedStep = (active = false) => {
    timelineSteps.push({
      date: createdAt,
      title: "Pesanan diajukan",
      subtitles: ["Menunggu persetujuan artist"],
      active,
      icon: <LuClipboardList className="text-[20px]" />,
    })
  }

  const addBuyerWillPayStep = () => {
    timelineSteps.push({
      type: "dot",
      date: acceptedAt,
      title: "Buyer akan melakukan pembayaran",
      active: false,
      bold: false,
    })
  }

  const addPaymentConfirmedStep = () => {
    timelineSteps.push({
      date: paymentConfirmedAt,
      title: "Menunggu pembayaran",
      subtitles: ["Buyer telah melakukan pembayaran"],
      active: false,
      icon: <FiDollarSign className="text-[20px]" />,
    })
  }

  const addProcessedStartedStep = () => {
    timelineSteps.push({
      type: "dot",
      date: processedAt,
      title: "Karya sedang dibuat",
      active: false,
      bold: false,
    })
  }

  const addResultUploadedStep = (active = false) => {
    timelineSteps.push({
      date: resultUploadedAt,
      title: "Pesanan diproses",
      subtitles: ["Hasil karya sudah dikirim"],
      linkText: "Lihat hasil",
      linkHref: selectedOrder?.resultLink,
      active,
      icon: <FiEdit2 className="text-[22px]" />,
    })
  }

  if (isCancelled) {
    timelineSteps.push({
      date: cancelledAt,
      title: "Pesanan dibatalkan",
      subtitles: [cancelSubtitle],
      active: true,
      icon: <FiX className="text-[22px]" />,
    })

    if (hasResultUploadedAt) {
      addResultUploadedStep(false)
      addProcessedStartedStep()
      addPaymentConfirmedStep()
      addBuyerWillPayStep()
    } else if (hasProcessedAt) {
      timelineSteps.push({
        date: processedAt,
        title: "Pesanan diproses",
        subtitles: ["Karya sedang dibuat"],
        active: false,
        icon: <FiEdit2 className="text-[20px]" />,
      })
      addPaymentConfirmedStep()
      addBuyerWillPayStep()
    } else if (hasPaymentConfirmedAt) {
      addPaymentConfirmedStep()
      addBuyerWillPayStep()
    } else if (hasAcceptedAt) {
      timelineSteps.push({
        date: acceptedAt,
        title: "Menunggu pembayaran",
        subtitles: ["Buyer akan melakukan pembayaran"],
        active: false,
        icon: <FiDollarSign className="text-[20px]" />,
      })
    }

    addCreatedStep(false)
  } else if (isCompleted) {
    timelineSteps.push({
      date: completedAt,
      title: "Pesanan selesai",
      subtitles: ["Pesanan telah disetujui buyer"],
      active: true,
      icon: <FiEdit2 className="text-[22px]" />,
    })

    if (selectedOrder?.revisionUploadedAt) {
      timelineSteps.push({
        date: revisionUploadedAt,
        title: "Pesanan direvisi",
        subtitles: ["Hasil revisi 1 sudah dikirim"],
        linkText: "Lihat hasil revisi 1",
        linkHref: selectedOrder?.revisionLink,
        active: false,
        icon: <FiEdit2 className="text-[20px]" />,
      })

      timelineSteps.push({
        type: "dot",
        date: revisionRequestedAt,
        title: "Revisi karya sedang dibuat",
        active: false,
        bold: false,
      })
    }

    addResultUploadedStep(false)
    addProcessedStartedStep()
    addPaymentConfirmedStep()
    addBuyerWillPayStep()
    addCreatedStep(false)
  } else if (isRevisionUploaded) {
    timelineSteps.push({
      date: revisionUploadedAt,
      title: "Pesanan direvisi",
      subtitles: ["Hasil revisi 1 sudah dikirim"],
      linkText: "Lihat hasil revisi 1",
      linkHref: selectedOrder?.revisionLink,
      active: true,
      icon: <FiEdit2 className="text-[22px]" />,
    })

    timelineSteps.push({
      type: "dot",
      date: revisionRequestedAt,
      title: "Revisi karya sedang dibuat",
      active: false,
      bold: false,
    })

    addResultUploadedStep(false)
    addProcessedStartedStep()
    addPaymentConfirmedStep()
    addBuyerWillPayStep()
    addCreatedStep(false)
  } else if (isRevisionRequested) {
    timelineSteps.push({
      date: revisionRequestedAt,
      title: "Pesanan direvisi",
      subtitles: ["Revisi karya sedang dibuat"],
      linkText: "Lihat brief revisi 1",
      active: true,
      icon: <FiEdit2 className="text-[22px]" />,
    })

    addResultUploadedStep(false)
    addProcessedStartedStep()
    addPaymentConfirmedStep()
    addBuyerWillPayStep()
    addCreatedStep(false)
  } else if (isResultUploaded) {
    timelineSteps.push({
      date: resultUploadedAt,
      title: "Pesanan diproses",
      subtitles: ["Hasil karya sudah dikirim"],
      linkText: "Lihat hasil",
      linkHref: selectedOrder?.resultLink,
      active: true,
      icon: <FiEdit2 className="text-[22px]" />,
    })

    addProcessedStartedStep()
    addPaymentConfirmedStep()
    addBuyerWillPayStep()
    addCreatedStep(false)
  } else if (isProcessed) {
    timelineSteps.push({
      date: processedAt,
      title: "Pesanan diproses",
      subtitles: ["Karya sedang dibuat"],
      active: true,
      icon: <FiEdit2 className="text-[22px]" />,
      actions:
        role === "artist" ? (
          <div className="flex justify-end mt-[30px]">
            <button
              onClick={() => setShowUploadPopup(true)}
              className="w-[130px] h-[46px] bg-black text-white rounded-[10px] text-[20px]"
            >
              Upload
            </button>
          </div>
        ) : null,
    })

    addPaymentConfirmedStep()
    addBuyerWillPayStep()
    addCreatedStep(false)
  } else if (isBuyerConfirmedPayment) {
    timelineSteps.push({
      date: paymentConfirmedAt,
      title: "Menunggu pembayaran",
      subtitles:
        role === "artist"
          ? ["Buyer telah melakukan pembayaran"]
          : ["Pembayaran sedang menunggu konfirmasi artist"],
      active: true,
      icon: <FiDollarSign className="text-[22px]" />,
      actions:
        role === "artist" ? (
          <div className="flex justify-end gap-5 mt-[30px]">
            <button className="w-[150px] h-[46px] bg-black text-white rounded-[10px] text-[20px]">
              Lihat Bukti
            </button>

            <button
              onClick={() => confirmPaymentByArtist(id)}
              className="w-[150px] h-[46px] bg-black text-white rounded-[10px] text-[20px]"
            >
              Konfirmasi
            </button>
          </div>
        ) : null,
    })

    addBuyerWillPayStep()
    addCreatedStep(false)
  } else if (isAccepted) {
    timelineSteps.push({
      date: acceptedAt,
      title: "Menunggu pembayaran",
      subtitles:
        role === "buyer"
          ? ["Lakukan pembayaran melalui kode QR berikut"]
          : ["Buyer akan melakukan pembayaran"],
      active: true,
      icon: <FiDollarSign className="text-[22px]" />,
      extra:
        role === "buyer" ? (
          <>
            <div className="mt-4 w-[370px] border-[1px] border-black bg-white flex flex-col items-center py-5">
              <p className="text-[20px] font-semibold mb-4">
                {totalPrice}
              </p>

              <DummyQR />
            </div>

            <p className="text-[20px] text-yellow-500 mt-4">
              Konfirmasi dengan mengirim bukti pembayaran
            </p>
          </>
        ) : null,
      actions:
        role === "buyer" ? (
          <div className="flex justify-end gap-4 mt-4 w-[580px]">
            <button
              onClick={() => confirmPaymentByBuyer(id)}
              className="w-[150px] h-[46px] bg-black text-white rounded-[10px] text-[20px]"
            >
              Konfirmasi
            </button>

            <button
              onClick={() => {
                cancelOrder(id)
                setCurrentPage("profile")
              }}
              className="w-[130px] h-[46px] bg-black text-white rounded-[10px] text-[20px]"
            >
              Batalkan
            </button>
          </div>
        ) : null,
    })

    addCreatedStep(false)
  } else {
    timelineSteps.push({
      date: createdAt,
      title: "Pesanan diajukan",
      subtitles: ["Menunggu persetujuan artist"],
      active: true,
      icon: <LuClipboardList className="text-[20px]" />,
      actions:
        role === "buyer" && canCancel ? (
          <div className="flex justify-end mt-[30px]">
            <button
              onClick={() => {
                cancelOrder(id)
                setCurrentPage("profile")
              }}
              className="w-[130px] h-[46px] bg-black text-white rounded-[10px] text-[20px]"
            >
              Batalkan
            </button>
          </div>
        ) : role === "artist" && status === ORDER_STATUS.WAITING ? (
          <div className="flex justify-end gap-5 mt-[30px]">
            <button
              onClick={() => rejectOrderByArtist(id)}
              className="w-[110px] h-[46px] bg-black text-white rounded-[10px] text-[20px]"
            >
              Tolak
            </button>

            <button
              onClick={() => setShowPricePopup(true)}
              className="w-[130px] h-[46px] bg-black text-white rounded-[10px] text-[20px]"
            >
              Terima
            </button>
          </div>
        ) : null,
    })
  }

  return (
    <>
      {showPricePopup && (
        <>
          <div className="fixed inset-0 bg-black/30 z-[80]" />

          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white rounded-[28px] shadow-lg z-[90] px-10 py-10">
            <p className="text-[24px] text-center">
              Tentukan harga final untuk pesanan ini
            </p>

            <div className="flex items-center gap-4 mt-8">
              <p className="text-[24px]">
                Rp
              </p>

              <input
                value={finalPriceInput}
                onChange={handlePriceChange}
                className="w-[135px] h-[68px] border-[3px] border-black rounded-[18px] text-[24px] text-center outline-none"
              />
            </div>

            {priceNumber > 0 && (
              <p className="text-[16px] text-red-500 mt-3">
                Nominal harga yang akan diterima: {formatRupiah(receivedAmount)}
              </p>
            )}

            <div className="flex justify-end gap-7 mt-10">
              <button
                onClick={() => {
                  setShowPricePopup(false)
                  setFinalPriceInput("0")
                }}
                className="w-[130px] h-[46px] border-[3px] border-black rounded-[10px] text-[20px]"
              >
                Cancel
              </button>

              <button
                onClick={handleAcceptOrder}
                className="w-[140px] h-[46px] bg-black text-white rounded-[10px] text-[20px]"
              >
                Ajukan
              </button>
            </div>
          </div>
        </>
      )}

      {showUploadPopup && (
        <>
          <div className="fixed inset-0 bg-black/30 z-[80]" />

          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[430px] bg-white rounded-[24px] shadow-lg z-[90] px-8 py-8">
            <p className="text-[24px] text-center">
              Link G-drive
            </p>

            <input
              value={gdriveLink}
              onChange={(e) => setGdriveLink(e.target.value)}
              className="w-full h-[46px] border-[3px] border-black rounded-[18px] px-4 text-[18px] outline-none mt-6"
            />

            <div className="flex justify-end mt-7">
              <button
                onClick={handleUploadResult}
                className="w-[130px] h-[46px] bg-black text-white rounded-[10px] text-[20px]"
              >
                Upload
              </button>
            </div>
          </div>
        </>
      )}

      <div className="border-[3px] border-[#D9D9D9] bg-[#F5F5F5] shadow-md overflow-hidden">
        <div className="flex justify-between items-center px-7 py-4 border-b-[2px] border-[#D9D9D9]">
          <div className="flex items-center gap-5">
            <button
              onClick={() => setCurrentPage("profile")}
              className="flex items-center justify-center"
            >
              <IoArrowBack className="text-[22px]" />
            </button>

            <p className="text-[16px]">
              NO. PESANAN. {id || "000002BLABLA"}
            </p>
          </div>

          <p className="text-[16px] text-yellow-500">
            {headerStatus}
          </p>
        </div>

        <div className="px-7 py-7 border-b-[2px] border-[#D9D9D9]">
          <div className="relative">
            {timelineSteps.length > 1 && (
              <div className="absolute left-[20px] top-[42px] bottom-[21px] w-[2px] bg-[#D9D9D9]" />
            )}

            <div className="flex flex-col gap-[28px]">
              {timelineSteps.map((step, index) => (
                <TimelineStep
                  key={`${step.title}-${index}`}
                  step={step}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="px-7 py-8">
          <div className="flex gap-7">
            <div className="w-[250px] h-[115px] border-[3px] border-black rounded-[18px] flex-shrink-0" />

            <div className="flex flex-col justify-center">
              <p className="text-[20px]">
                {displayName}
              </p>

              <p className="text-[20px] mt-2">
                {product} x{quantity}
              </p>

              <p className="text-[20px] mt-2">
                {price}
              </p>
            </div>
          </div>

          <p className="text-[16px] text-[#333333] leading-[28px] mt-4 break-words">
            {description}
          </p>
        </div>
      </div>
    </>
  )
}

export default OrderDetailPage