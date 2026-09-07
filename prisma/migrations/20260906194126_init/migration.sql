-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "oldPrice" INTEGER NOT NULL DEFAULT 0,
    "accent" TEXT NOT NULL DEFAULT 'from-slate-700 via-stone-700 to-neutral-900',
    "accentColor" TEXT NOT NULL DEFAULT '#facc15',
    "image" TEXT NOT NULL DEFAULT '/product.png',
    "description" TEXT NOT NULL,
    "highlights" TEXT[],
    "groupType" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'product',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_groupType_idx" ON "Product"("groupType");
