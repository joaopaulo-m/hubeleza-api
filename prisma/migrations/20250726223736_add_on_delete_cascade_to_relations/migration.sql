-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_treatment_id_fkey";

-- DropForeignKey
ALTER TABLE "leads_dispatch" DROP CONSTRAINT "leads_dispatch_lead_id_fkey";

-- DropForeignKey
ALTER TABLE "leads_dispatch" DROP CONSTRAINT "leads_dispatch_partner_id_fkey";

-- DropForeignKey
ALTER TABLE "leads_dispatch" DROP CONSTRAINT "leads_dispatch_treatment_id_fkey";

-- DropForeignKey
ALTER TABLE "leads_treatments" DROP CONSTRAINT "leads_treatments_lead_id_fkey";

-- DropForeignKey
ALTER TABLE "leads_treatments" DROP CONSTRAINT "leads_treatments_treatment_id_fkey";

-- DropForeignKey
ALTER TABLE "partners_treatments" DROP CONSTRAINT "partners_treatments_partner_id_fkey";

-- DropForeignKey
ALTER TABLE "partners_treatments" DROP CONSTRAINT "partners_treatments_treatment_id_fkey";

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partners_treatments" ADD CONSTRAINT "partners_treatments_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partners_treatments" ADD CONSTRAINT "partners_treatments_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads_treatments" ADD CONSTRAINT "leads_treatments_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads_treatments" ADD CONSTRAINT "leads_treatments_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads_dispatch" ADD CONSTRAINT "leads_dispatch_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads_dispatch" ADD CONSTRAINT "leads_dispatch_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads_dispatch" ADD CONSTRAINT "leads_dispatch_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
