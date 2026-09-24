-- PostgreSQL folds unquoted identifiers to lowercase. Rename the legacy
-- Prisma-created quoted table names to predictable lowercase names.
ALTER TABLE "Product" RENAME TO "products";
ALTER TABLE "Order" RENAME TO "orders";
ALTER TABLE "OrderItem" RENAME TO "order_items";
ALTER TABLE "Message" RENAME TO "messages";
