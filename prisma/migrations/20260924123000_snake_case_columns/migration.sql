-- Rename existing camelCase columns to lowercase snake_case without changing data.
ALTER TABLE IF EXISTS "product" RENAME COLUMN "nameZh" TO "name_zh";
ALTER TABLE IF EXISTS "product" RENAME COLUMN "oldPrice" TO "old_price";
ALTER TABLE IF EXISTS "product" RENAME COLUMN "accentColor" TO "accent_color";
ALTER TABLE IF EXISTS "product" RENAME COLUMN "descriptionZh" TO "description_zh";
ALTER TABLE IF EXISTS "product" RENAME COLUMN "groupType" TO "group_type";
ALTER TABLE IF EXISTS "product" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE IF EXISTS "product" RENAME COLUMN "updatedAt" TO "updated_at";

ALTER TABLE IF EXISTS "orders" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE IF EXISTS "orders" RENAME COLUMN "updatedAt" TO "updated_at";

ALTER TABLE IF EXISTS "message" RENAME COLUMN "createdAt" TO "created_at";

ALTER TABLE IF EXISTS "order_items" RENAME COLUMN "orderId" TO "order_id";
ALTER TABLE IF EXISTS "order_items" RENAME COLUMN "unitPrice" TO "unit_price";
