-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('DONATOR', 'CONSUMER');

-- CreateEnum
CREATE TYPE "donation_state" AS ENUM ('PENDING', 'MATCHED', 'SUCCEED');

-- CreateEnum
CREATE TYPE "product_size" AS ENUM ('PANTY_LINER', 'SMALL', 'MIDIUM', 'LARGE', 'OVERNIGHT');

-- CreateEnum
CREATE TYPE "gender" AS ENUM ('WOMEN', 'MEN', 'NON_BINARY');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" DATE NOT NULL,
    "type" "user_type" NOT NULL,
    "email" TEXT NOT NULL,
    "photo" TEXT,
    "country" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consumer" (
    "id" TEXT NOT NULL,

    CONSTRAINT "consumer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donator" (
    "id" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "gender" "gender" NOT NULL,

    CONSTRAINT "donator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "consumer_id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "detail" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donation" (
    "id" INTEGER NOT NULL,
    "cosumer_id" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "donator_id" TEXT,
    "matched_time" DATE,
    "state" "donation_state" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "size" "product_size" NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "letter" (
    "id" INTEGER NOT NULL,
    "photo" TEXT,
    "content" TEXT NOT NULL,

    CONSTRAINT "letter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "address_consumer_id_key" ON "address"("consumer_id");

-- AddForeignKey
ALTER TABLE "consumer" ADD CONSTRAINT "consumer_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donator" ADD CONSTRAINT "donator_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_consumer_id_fkey" FOREIGN KEY ("consumer_id") REFERENCES "consumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_cosumer_id_fkey" FOREIGN KEY ("cosumer_id") REFERENCES "consumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_donator_id_fkey" FOREIGN KEY ("donator_id") REFERENCES "donator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "letter" ADD CONSTRAINT "letter_id_fkey" FOREIGN KEY ("id") REFERENCES "donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
