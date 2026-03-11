// prisma/seed.ts
// Example data only — enough to develop and test the UI against.
// The production seed (from the Excel file) replaces this later.
//
// Run with: npx prisma db seed
//
// Relative import so the PrismaNeon/PrismaPg adapter from lib/prisma is used.
// Path aliases (@/) don't resolve in ts-node outside the Next.js compiler.

import { prisma } from '../src/lib/prisma';
import { ContactType, ContactInfoType } from '../src/generated/prisma/client';

async function main() {
  console.log('🌱 Seeding example data…');

  // ── ref_status ─────────────────────────────────────────────────────────────
  console.log('→ ref_status');
  const statuses = await Promise.all([
    prisma.refStatus.upsert({
      where: { nombre: 'Activo' },
      update: {},
      create: { nombre: 'Activo', color: '#22c55e' },
    }),
    prisma.refStatus.upsert({
      where: { nombre: 'En Negociación' },
      update: {},
      create: { nombre: 'En Negociación', color: '#f59e0b' },
    }),
    prisma.refStatus.upsert({
      where: { nombre: 'No Interesado' },
      update: {},
      create: { nombre: 'No Interesado', color: '#6b7280' },
    }),
    prisma.refStatus.upsert({
      where: { nombre: 'Desactivado' },
      update: {},
      create: { nombre: 'Desactivado', color: '#ef4444' },
    }),
    prisma.refStatus.upsert({
      where: { nombre: 'Vencido' },
      update: {},
      create: { nombre: 'Vencido', color: '#94a3b8' },
    }),
  ]);
  const [statusActivo, statusNegociacion, , , statusVencido] = statuses;

  // ── ref_region ─────────────────────────────────────────────────────────────
  console.log('→ ref_region');
  const regions = await Promise.all([
    prisma.refRegion.upsert({
      where: { nombre: 'Europa' },
      update: {},
      create: { nombre: 'Europa' },
    }),
    prisma.refRegion.upsert({
      where: { nombre: 'América del Norte' },
      update: {},
      create: { nombre: 'América del Norte' },
    }),
    prisma.refRegion.upsert({
      where: { nombre: 'América Latina' },
      update: {},
      create: { nombre: 'América Latina' },
    }),
    prisma.refRegion.upsert({
      where: { nombre: 'Asia' },
      update: {},
      create: { nombre: 'Asia' },
    }),
    prisma.refRegion.upsert({
      where: { nombre: 'Medio Oriente' },
      update: {},
      create: { nombre: 'Medio Oriente' },
    }),
    prisma.refRegion.upsert({
      where: { nombre: 'Oceanía' },
      update: {},
      create: { nombre: 'Oceanía' },
    }),
    prisma.refRegion.upsert({
      where: { nombre: 'África' },
      update: {},
      create: { nombre: 'África' },
    }),
    prisma.refRegion.upsert({
      where: { nombre: 'América del Sur' },
      update: {},
      create: { nombre: 'América del Sur' },
    }),
  ]);
  const [regEuropa, regNorte, regLatam] = regions;

  // ── ref_pais ───────────────────────────────────────────────────────────────
  console.log('→ ref_pais');
  const paises = await Promise.all([
    prisma.refPais.upsert({
      where: { nombre: 'España' },
      update: {},
      create: { nombre: 'España' },
    }),
    prisma.refPais.upsert({
      where: { nombre: 'Estados Unidos' },
      update: {},
      create: { nombre: 'Estados Unidos' },
    }),
    prisma.refPais.upsert({
      where: { nombre: 'Francia' },
      update: {},
      create: { nombre: 'Francia' },
    }),
    prisma.refPais.upsert({
      where: { nombre: 'Alemania' },
      update: {},
      create: { nombre: 'Alemania' },
    }),
    prisma.refPais.upsert({
      where: { nombre: 'México' },
      update: {},
      create: { nombre: 'México' },
    }),
    prisma.refPais.upsert({
      where: { nombre: 'Colombia' },
      update: {},
      create: { nombre: 'Colombia' },
    }),
    prisma.refPais.upsert({
      where: { nombre: 'Italia' },
      update: {},
      create: { nombre: 'Italia' },
    }),
  ]);
  const [paisEspana, paisEUA, paisFrancia, paisAlemania] = paises;

  // ── ref_giro ───────────────────────────────────────────────────────────────
  console.log('→ ref_giro');
  const giros = await Promise.all([
    prisma.refGiro.upsert({
      where: { nombre: 'Universidad' },
      update: {},
      create: { nombre: 'Universidad' },
    }),
    prisma.refGiro.upsert({
      where: { nombre: 'Escuelas Especializadas' },
      update: {},
      create: { nombre: 'Escuelas Especializadas' },
    }),
    prisma.refGiro.upsert({
      where: { nombre: 'Centro de Investigación' },
      update: {},
      create: { nombre: 'Centro de Investigación' },
    }),
    prisma.refGiro.upsert({
      where: { nombre: 'Empresa' },
      update: {},
      create: { nombre: 'Empresa' },
    }),
    prisma.refGiro.upsert({
      where: { nombre: 'Asociación' },
      update: {},
      create: { nombre: 'Asociación' },
    }),
  ]);
  const [giroUniversidad, giroEspecializada] = giros;

  // ── ref_campus ─────────────────────────────────────────────────────────────
  console.log('→ ref_campus');
  const campuses = await Promise.all([
    prisma.refCampus.upsert({
      where: { nombre: 'México' },
      update: {},
      create: { nombre: 'México' },
    }),
    prisma.refCampus.upsert({
      where: { nombre: 'Norte' },
      update: {},
      create: { nombre: 'Norte' },
    }),
    prisma.refCampus.upsert({
      where: { nombre: 'Sur' },
      update: {},
      create: { nombre: 'Sur' },
    }),
  ]);
  const [campusMexico, campusNorte] = campuses;

  // ── ref_agreement_type ─────────────────────────────────────────────────────
  console.log('→ ref_agreement_type');
  const agreementTypes = await Promise.all([
    prisma.refAgreementType.upsert({
      where: { nombre: 'Intercambio' },
      update: {},
      create: { nombre: 'Intercambio' },
    }),
    prisma.refAgreementType.upsert({
      where: { nombre: 'Study Abroad' },
      update: {},
      create: { nombre: 'Study Abroad' },
    }),
    prisma.refAgreementType.upsert({
      where: { nombre: 'Investigación' },
      update: {},
      create: { nombre: 'Investigación' },
    }),
    prisma.refAgreementType.upsert({
      where: { nombre: 'Prácticas' },
      update: {},
      create: { nombre: 'Prácticas' },
    }),
    prisma.refAgreementType.upsert({
      where: { nombre: 'Doble Diploma' },
      update: {},
      create: { nombre: 'Doble Diploma' },
    }),
    prisma.refAgreementType.upsert({
      where: { nombre: 'Cotutela' },
      update: {},
      create: { nombre: 'Cotutela' },
    }),
    prisma.refAgreementType.upsert({
      where: { nombre: 'Otro' },
      update: {},
      create: { nombre: 'Otro' },
    }),
  ]);
  const [typeIntercambio, typeStudyAbroad, typeInvestigacion] = agreementTypes;

  // ── ref_attr ───────────────────────────────────────────────────────────────
  console.log('→ ref_attr');
  const attrs = await Promise.all([
    prisma.refAttr.upsert({
      where: { nombre: 'ABET' },
      update: {},
      create: { nombre: 'ABET' },
    }),
    prisma.refAttr.upsert({
      where: { nombre: 'ACJMC' },
      update: {},
      create: { nombre: 'ACJMC' },
    }),
    prisma.refAttr.upsert({
      where: { nombre: 'AACSB' },
      update: {},
      create: { nombre: 'AACSB' },
    }),
    prisma.refAttr.upsert({
      where: { nombre: 'AMBA' },
      update: {},
      create: { nombre: 'AMBA' },
    }),
    prisma.refAttr.upsert({
      where: { nombre: 'EFMD' },
      update: {},
      create: { nombre: 'EFMD' },
    }),
  ]);
  const [, , attrAACSB, attrAMBA, attrEFMD] = attrs;

  // ── Universities ───────────────────────────────────────────────────────────
  console.log('→ universities');

  const uniComplutense = await prisma.university.upsert({
    where: { slug: 'universidad-complutense-de-madrid' },
    update: {},
    create: {
      nombre: 'Universidad Complutense de Madrid',
      slug: 'universidad-complutense-de-madrid',
      ciudad: 'Madrid',
      catholica: false,
      qs_ranking: 171,
      pagina_web: 'https://www.ucm.es',
      comments: 'Una de las universidades más antiguas de Europa.',
      lat: 40.4498,
      lng: -3.7277,
      regionId: regEuropa.id,
      paisId: paisEspana.id,
      giroId: giroUniversidad.id,
      campusId: campusMexico.id,
    },
  });

  const uniTexas = await prisma.university.upsert({
    where: { slug: 'university-of-texas-at-austin' },
    update: {},
    create: {
      nombre: 'University of Texas at Austin',
      slug: 'university-of-texas-at-austin',
      ciudad: 'Austin',
      catholica: false,
      qs_ranking: 67,
      pagina_web: 'https://www.utexas.edu',
      lat: 30.2849,
      lng: -97.7341,
      regionId: regNorte.id,
      paisId: paisEUA.id,
      giroId: giroUniversidad.id,
      campusId: campusNorte.id,
    },
  });

  const uniSorbonne = await prisma.university.upsert({
    where: { slug: 'sorbonne-universite' },
    update: {},
    create: {
      nombre: 'Sorbonne Université',
      slug: 'sorbonne-universite',
      ciudad: 'París',
      catholica: false,
      qs_ranking: 83,
      pagina_web: 'https://www.sorbonne-universite.fr',
      lat: 48.8482,
      lng: 2.3442,
      regionId: regEuropa.id,
      paisId: paisFrancia.id,
      giroId: giroUniversidad.id,
      campusId: campusMexico.id,
    },
  });

  const uniMunich = await prisma.university.upsert({
    where: { slug: 'technische-universitaet-muenchen' },
    update: {},
    create: {
      nombre: 'Technische Universität München',
      slug: 'technische-universitaet-muenchen',
      ciudad: 'Múnich',
      catholica: false,
      qs_ranking: 37,
      pagina_web: 'https://www.tum.de',
      lat: 48.1497,
      lng: 11.5679,
      regionId: regEuropa.id,
      paisId: paisAlemania.id,
      giroId: giroEspecializada.id,
      campusId: campusNorte.id,
    },
  });

  // ── Contacts ───────────────────────────────────────────────────────────────
  console.log('→ contacts');

  const contactComplutenseIncoming = await prisma.contact.create({
    data: {
      universityId: uniComplutense.id,
      type: ContactType.INCOMING,
      nombre: 'María García',
    },
  });
  await prisma.contactInfo.createMany({
    data: [
      {
        contactId: contactComplutenseIncoming.id,
        type: ContactInfoType.EMAIL,
        value: 'intercambio.entrante@ucm.es',
      },
      {
        contactId: contactComplutenseIncoming.id,
        type: ContactInfoType.PHONE,
        value: '+34 91 394 1234',
      },
    ],
  });

  const contactComplutenseOutgoing = await prisma.contact.create({
    data: {
      universityId: uniComplutense.id,
      type: ContactType.OUTGOING,
      nombre: 'Carlos López',
    },
  });
  await prisma.contactInfo.create({
    data: {
      contactId: contactComplutenseOutgoing.id,
      type: ContactInfoType.EMAIL,
      value: 'intercambio.saliente@ucm.es',
    },
  });

  const contactTexasGeneral = await prisma.contact.create({
    data: {
      universityId: uniTexas.id,
      type: ContactType.GENERAL,
      nombre: 'Dr. James Smith',
    },
  });
  await prisma.contactInfo.createMany({
    data: [
      {
        contactId: contactTexasGeneral.id,
        type: ContactInfoType.EMAIL,
        value: 'international@utexas.edu',
      },
      {
        contactId: contactTexasGeneral.id,
        type: ContactInfoType.PHONE,
        value: '+1 512 471 3434',
      },
    ],
  });

  // ── Agreements ─────────────────────────────────────────────────────────────
  console.log('→ agreements');

  // Complutense — intercambio activo
  const agComplutenseIntercambio = await prisma.agreement.create({
    data: {
      universityId: uniComplutense.id,
      typeId: typeIntercambio.id,
      statusId: statusActivo.id,
      inicio: 2019,
      vigencia: 2027,
      plazas_lic: 4,
      plazas_pos: 2,
      beneficiario: 'Facultad de Economía y Negocios',
      se_usa: true,
      link_convenio: 'https://convenios.anahuac.mx/ucm-2019.pdf',
    },
  });
  // AACSB + AMBA accreditations
  await prisma.agreementAttr.createMany({
    data: [
      { agreementId: agComplutenseIntercambio.id, attrId: attrAACSB.id },
      { agreementId: agComplutenseIntercambio.id, attrId: attrAMBA.id },
    ],
  });

  // Complutense — study abroad activo
  await prisma.agreement.create({
    data: {
      universityId: uniComplutense.id,
      typeId: typeStudyAbroad.id,
      statusId: statusActivo.id,
      inicio: 2019,
      vigencia: null, // indefinido
      beneficiario: 'Abierto',
      se_usa: true,
    },
  });

  // UT Austin — investigación activo
  await prisma.agreement.create({
    data: {
      universityId: uniTexas.id,
      typeId: typeInvestigacion.id,
      statusId: statusActivo.id,
      inicio: 2021,
      vigencia: 2026,
      beneficiario: 'Facultad de Ingeniería',
      se_usa: true,
      comments: 'Enfocado en proyectos de energía renovable.',
    },
  });

  // UT Austin — intercambio en negociación
  await prisma.agreement.create({
    data: {
      universityId: uniTexas.id,
      typeId: typeIntercambio.id,
      statusId: statusNegociacion.id,
      inicio: 2024,
      vigencia: 2028,
      plazas_lic: 2,
      beneficiario: 'Facultad de Ciencias de la Salud',
      se_usa: false,
    },
  });

  // Sorbonne — study abroad activo
  const agSorbonne = await prisma.agreement.create({
    data: {
      universityId: uniSorbonne.id,
      typeId: typeStudyAbroad.id,
      statusId: statusActivo.id,
      inicio: 2016,
      vigencia: null,
      plazas_lic: 5,
      beneficiario: 'Abierto',
      se_usa: true,
    },
  });
  await prisma.agreementAttr.create({
    data: { agreementId: agSorbonne.id, attrId: attrEFMD.id },
  });

  // TUM — vencido
  await prisma.agreement.create({
    data: {
      universityId: uniMunich.id,
      typeId: typeIntercambio.id,
      statusId: statusVencido.id,
      inicio: 2015,
      vigencia: 2022,
      plazas_lic: 3,
      beneficiario: 'Facultad de Diseño',
      se_usa: false,
      comments: 'Convenio vencido pendiente de renovación.',
    },
  });

  console.log('✅ Example seed complete.');
  console.log('   Universities : 4');
  console.log('   Agreements   : 6');
  console.log('   Contacts     : 3');

  console.log('\n✅ Example seed complete.');
  console.log('   Universities : 4');
  console.log('   Agreements   : 6');
  console.log('   Contacts     : 3');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
