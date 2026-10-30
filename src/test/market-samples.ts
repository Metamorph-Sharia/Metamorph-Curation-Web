// The market layer as the API answers it, typed by the contract: what the market views' tests render.
import type { CompanyPage, CompanyView, MarketSeriesView, MarketSources, ReleasePage, ReportView } from "@/lib/api/types";

export const BUS = "Bank Umum Syariah";
export const BPRS = "Bank Perekonomian Rakyat (BPR) Syariah";

export const SOURCES: MarketSources = {
  registers: [
    {
      id: "ojk:lpbbti",
      issuer: "ojk",
      name: "Penyelenggara LPBBTI",
      governed_by: ["ojk:pojk:2024:40", "ojk:seojk:2025:19"],
      reports: ["ojk:roadmap:2023:lpbbti"],
      fresh_days: 45,
      newest_edition: "2026-07-31",
      editions: 70,
      companies: 166,
    },
  ],
  sources: [
    {
      id: "bi:seki",
      issuer: "bi",
      name: "Statistik Ekonomi dan Keuangan Indonesia (SEKI)",
      citation: "Bank Indonesia, SEKI",
      fresh_days: 90,
      download_page: "https://www.bi.go.id/id/statistik/ekonomi-keuangan/seki/Default.aspx",
      download_hint: "Each month’s edition is one zip, e.g. SEKI_SEPTEMBER_2026.zip.",
      datasets: 107,
      series: 6919,
      newest_period: "2026-09-01",
    },
    {
      id: "ojk:portal",
      issuer: "ojk",
      name: "Portal Data OJK",
      citation: null,
      fresh_days: 120,
      download_page: null,
      download_hint: null,
      datasets: 78,
      series: 2182,
      newest_period: "2026-08-01",
    },
  ],
  industries: [
    { source: "ojk:portal", name: BUS, register: null, governed_by: ["id:uu:2008:21"], reports: ["ojk:lpksi"], datasets: 20 },
  ],
  sectors: [],
  named_industries: [
    { source: "ojk:portal", name: BPRS },
    { source: "ojk:portal", name: BUS },
  ],
};

export const COMPANY_ID = "ojk:lpbbti:kep-88-d.05-2021";

export const COMPANIES: CompanyPage = {
  rows: [
    {
      id: COMPANY_ID,
      register: "ojk:lpbbti",
      legal_name: "PT Fintech Bina Bangsa",
      status: "licensed",
      business_type: "sharia",
      first_listed: "2019-12-31",
      left_after: null,
    },
  ],
  total: 1,
  page: 1,
  pages: 3,
};

export const COMPANY: CompanyView = {
  company: COMPANIES.rows[0],
  names: ["Bina Bangsa"],
  entities: [
    {
      id: COMPANY_ID,
      kind: "license",
      license_number: "KEP-88/D.05/2021",
      license_date: "2021-02-28",
      legal_name: "PT Fintech Bina Bangsa",
      business_type: "sharia",
      website: "binabangsa.co.id",
      first_listed: "2021-02-28",
      last_listed: "2026-07-31",
      on_newest_list: true,
      left_after: null,
      review_notes: [],
    },
  ],
  mentions: [
    {
      kind: "release",
      document: "ojk:siaran-pers:2026:x",
      address: "p-1",
      citation: "Siaran Pers OJK SP 188/DKPU/OJK/X/2026, 8 Oktober 2026",
      title: "Siaran Pers: OJK Cabut Izin Usaha",
      published_on: "2026-10-08",
    },
  ],
};

export const SERIES: MarketSeriesView = {
  series: {
    id: "bi:seki:tabel7_1:quarterly:row=1",
    label: "PDB: Pertanian",
    frequency: "quarterly",
    unit: "Miliar Rp",
    first_period: "2026-01-01",
    last_period: "2026-04-01",
    observations: 2,
  },
  dataset: "bi:seki:tabel7_1",
  measure: "PDB",
  dimensions: [{ name: "Baris", key: "1", label: "Pertanian" }],
  citation: "Bank Indonesia, SEKI",
  url: null,
  observations: [
    { period: "2026-01-01", value: 6187598.6, provisional: false },
    { period: "2026-04-01", value: 6552068.0, provisional: true },
  ],
};

export const REPORT: ReportView = {
  report: {
    id: "ojk:lpksi:2025",
    issuer: "ojk",
    family: "lpksi",
    edition: "2025",
    title: "Laporan Perkembangan Keuangan Syariah Indonesia 2025",
    published_on: "2026-03-30",
    pages: 244,
    passages: 2,
    method: "ocr",
  },
  citation: "Otoritas Jasa Keuangan, LPKSI 2025",
  url: null,
  passages: [
    {
      address: "p-2",
      ordinal: 2,
      page_start: 31,
      page_end: 32,
      text: "Sesuai POJK 40 Tahun 2024, …",
      words: 280,
      names: [
        { kind: "regulation", id: "ojk:pojk:2024:40" },
        { kind: "company", id: COMPANY_ID },
      ],
    },
  ],
  page: 1,
  pages: 1,
};

export const RELEASES: ReleasePage = {
  rows: [{ id: "ojk:siaran-pers:2026:x", number: "SP 188/DKPU/OJK/X/2026", title: "Siaran Pers: OJK Cabut Izin Usaha", published_on: "2026-10-08", passages: 1 }],
  total: 1,
  page: 1,
  pages: 2,
};
