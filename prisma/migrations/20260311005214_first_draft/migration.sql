-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('INCOMING', 'OUTGOING', 'GENERAL');

-- CreateEnum
CREATE TYPE "ContactInfoType" AS ENUM ('EMAIL', 'PHONE');

-- CreateTable
CREATE TABLE "ref_region" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,

    CONSTRAINT "ref_region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ref_pais" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,

    CONSTRAINT "ref_pais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ref_giro" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,

    CONSTRAINT "ref_giro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ref_campus" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,

    CONSTRAINT "ref_campus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ref_agreement_type" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,

    CONSTRAINT "ref_agreement_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ref_attr" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,

    CONSTRAINT "ref_attr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ref_status" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "color" VARCHAR(7),

    CONSTRAINT "ref_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(300) NOT NULL,
    "ciudad" VARCHAR(150),
    "address" VARCHAR(500),
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "catholica" BOOLEAN NOT NULL DEFAULT false,
    "qs_ranking" INTEGER,
    "pagina_web" VARCHAR(500),
    "comments" TEXT,
    "regionId" INTEGER NOT NULL,
    "paisId" INTEGER NOT NULL,
    "giroId" INTEGER,
    "campusId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "university_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "type" "ContactType" NOT NULL,
    "nombre" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_info" (
    "id" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "type" "ContactInfoType" NOT NULL,
    "value" VARCHAR(255) NOT NULL,

    CONSTRAINT "contact_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agreement" (
    "id" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "inicio" INTEGER,
    "vigencia" INTEGER,
    "plazas_lic" INTEGER,
    "plazas_pos" INTEGER,
    "beneficiario" VARCHAR(500),
    "se_usa" BOOLEAN NOT NULL DEFAULT true,
    "link_convenio" VARCHAR(500),
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "agreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agreement_attr" (
    "agreementId" TEXT NOT NULL,
    "attrId" INTEGER NOT NULL,

    CONSTRAINT "agreement_attr_pkey" PRIMARY KEY ("agreementId","attrId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ref_region_nombre_key" ON "ref_region"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "ref_pais_nombre_key" ON "ref_pais"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "ref_giro_nombre_key" ON "ref_giro"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "ref_campus_nombre_key" ON "ref_campus"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "ref_agreement_type_nombre_key" ON "ref_agreement_type"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "ref_attr_nombre_key" ON "ref_attr"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "ref_status_nombre_key" ON "ref_status"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "university_slug_key" ON "university"("slug");

-- AddForeignKey
ALTER TABLE "university" ADD CONSTRAINT "university_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "ref_region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university" ADD CONSTRAINT "university_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "ref_pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university" ADD CONSTRAINT "university_giroId_fkey" FOREIGN KEY ("giroId") REFERENCES "ref_giro"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university" ADD CONSTRAINT "university_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "ref_campus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "university"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_info" ADD CONSTRAINT "contact_info_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agreement" ADD CONSTRAINT "agreement_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "university"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agreement" ADD CONSTRAINT "agreement_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ref_agreement_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agreement" ADD CONSTRAINT "agreement_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ref_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agreement_attr" ADD CONSTRAINT "agreement_attr_agreementId_fkey" FOREIGN KEY ("agreementId") REFERENCES "agreement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agreement_attr" ADD CONSTRAINT "agreement_attr_attrId_fkey" FOREIGN KEY ("attrId") REFERENCES "ref_attr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
