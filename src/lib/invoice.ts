import { jsPDF } from "jspdf"
import type { CartItem } from "@/hooks/useCart"

const blue = [19, 101, 157] as const
const dark = [35, 42, 48] as const
const muted = [115, 123, 130] as const
const border = [220, 225, 229] as const
const green = [43, 128, 99] as const

function formatKz(value: number): string {
  return `${value.toLocaleString("pt-AO")} Kz`
}

function formatDocumentDate(date: Date): string {
  return date.toLocaleDateString("pt-AO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function downloadCartInvoice(
  items: CartItem[],
  totalPrice: number,
): void {
  if (!items.length) return

  const pdf = new jsPDF({ format: "a4", unit: "mm" })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  const now = new Date()
  const documentNumber = `SMBB-${now.toISOString().replace(/\D/g, "").slice(0, 14)}`
  let y = 28

  function drawHeader() {
    pdf.setFillColor(...blue)
    pdf.rect(0, 0, pageWidth, 5, "F")
    pdf.setTextColor(...blue)
    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(20)
    pdf.text("SMBB", margin, 22)
    pdf.setTextColor(...muted)
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(8)
    pdf.text("Seguranca, qualidade e confiança", margin, 30)
    pdf.setTextColor(...dark)
    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(10)
    pdf.text("FATURA PROFORMA", pageWidth - margin, 22, { align: "right" })
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(8)
    pdf.text(`Documento: ${documentNumber}`, pageWidth - margin, 30, {
      align: "right",
    })
  }

  function drawFooter() {
    pdf.setDrawColor(...border)
    pdf.line(margin, pageHeight - 17, pageWidth - margin, pageHeight - 17)
    pdf.setTextColor(...muted)
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(7)
    pdf.text("SMBB - Segurança, qualidade e confiança", margin, pageHeight - 10)
    pdf.text(
      `Página ${pdf.getNumberOfPages()}`,
      pageWidth - margin,
      pageHeight - 10,
      {
        align: "right",
      },
    )
  }

  function drawSectionTitle(title: string) {
    pdf.setFillColor(...blue)
    pdf.rect(margin, y, contentWidth, 8, "F")
    pdf.setTextColor(255, 255, 255)
    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(8)
    pdf.text(title, margin + 4, y + 5.5)
    y += 15
  }

  function addPage() {
    pdf.addPage()
    drawHeader()
    drawFooter()
    y = 42
  }

  function ensureSpace(height: number) {
    if (y + height > pageHeight - 25) addPage()
  }

  function drawTerms() {
    ensureSpace(55)
    drawSectionTitle("OBSERVAÇÕES")
    pdf.setTextColor(...muted)
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(7)
    const terms = pdf.splitTextToSize(
      "Esta fatura proforma apresenta uma estimativa dos produtos selecionados e não constitui uma fatura fiscal. Os valores e a disponibilidade estão sujeitos a confirmação. O pagamento e as condições de entrega serão combinados após a aprovação do pedido.",
      contentWidth - 8,
    )
    pdf.text(terms, margin + 4, y)
  }

  drawHeader()
  drawFooter()
  drawSectionTitle("INFORMAÇÕES DO DOCUMENTO")

  pdf.setTextColor(...dark)
  pdf.setFont("helvetica", "bold")
  pdf.setFontSize(8)
  pdf.text(
    `Data de emissão: ${formatDocumentDate(now)} às ${now.toLocaleTimeString(
      "pt-AO",
      {
        hour: "2-digit",
        minute: "2-digit",
      },
    )}`,
    margin + 4,
    y,
  )
  pdf.text("Moeda: Kwanza (Kz)", pageWidth - margin - 4, y, { align: "right" })
  y += 7
  pdf.text("Estado: Orçamento para aprovação", margin + 4, y)
  pdf.text("Pagamento: A combinar", pageWidth - margin - 4, y, {
    align: "right",
  })
  y += 13

  drawSectionTitle("ITENS DO PEDIDO")
  pdf.setFillColor(239, 243, 246)
  pdf.rect(margin, y - 5, contentWidth, 8, "F")
  pdf.setTextColor(...dark)
  pdf.setFont("helvetica", "bold")
  pdf.setFontSize(7)
  pdf.text("PRODUTO", margin + 4, y)
  pdf.text("QTD.", pageWidth - 72, y, { align: "right" })
  pdf.text("UNITÁRIO", pageWidth - 44, y, { align: "right" })
  pdf.text("SUBTOTAL", pageWidth - margin - 4, y, { align: "right" })
  y += 10

  for (const item of items) {
    const productName = pdf.splitTextToSize(item.name, 90)
    const rowHeight = Math.max(8, productName.length * 4 + 4)
    ensureSpace(rowHeight + 4)
    pdf.setTextColor(...dark)
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(8)
    pdf.text(productName, margin + 4, y)
    pdf.text(String(item.quantity), pageWidth - 72, y, { align: "right" })
    pdf.text(formatKz(item.price), pageWidth - 44, y, { align: "right" })
    pdf.text(formatKz(item.price * item.quantity), pageWidth - margin - 4, y, {
      align: "right",
    })
    pdf.setDrawColor(...border)
    pdf.line(margin, y + rowHeight - 3, pageWidth - margin, y + rowHeight - 3)
    y += rowHeight
  }

  y += 7
  pdf.setTextColor(...dark)
  pdf.setFont("helvetica", "bold")
  pdf.setFontSize(11)
  pdf.text("TOTAL", pageWidth - 66, y, { align: "right" })
  pdf.setTextColor(...green)
  pdf.text(formatKz(totalPrice), pageWidth - margin - 4, y, { align: "right" })
  y += 18

  drawTerms()
  pdf.save(`${documentNumber}.pdf`)
}
