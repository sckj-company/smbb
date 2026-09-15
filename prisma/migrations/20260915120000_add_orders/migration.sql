-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'product',
    "channel" TEXT NOT NULL DEFAULT 'whatsapp',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "total" INTEGER NOT NULL DEFAULT 0,
    "customer" TEXT NOT NULL DEFAULT '',
    "metadata" TEXT NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT '',
    "quantity" INTEGER NOT NULL,
    "unitPrice" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
