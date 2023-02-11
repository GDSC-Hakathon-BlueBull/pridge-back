-- AlterTable
CREATE SEQUENCE donation_id_seq;
ALTER TABLE "donation" ALTER COLUMN "id" SET DEFAULT nextval('donation_id_seq');
ALTER SEQUENCE donation_id_seq OWNED BY "donation"."id";
