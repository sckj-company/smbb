-- Add optional customer phone number to orders
ALTER TABLE "Order" ADD COLUMN "phone" TEXT NOT NULL DEFAULT '';