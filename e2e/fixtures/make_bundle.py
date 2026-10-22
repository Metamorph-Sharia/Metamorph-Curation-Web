"""The curation web app's end-to-end fixture: one small contract v2 bundle with five documents.

Run from Metamorph-Knowledge-Platform (it uses the contract's sample document and writer):
    uv run python ../Metamorph-Curation-Web/e2e/fixtures/make_bundle.py ../Metamorph-Curation-Web/e2e/fixtures/bundle
"""
import hashlib, shutil, sys
from dataclasses import replace
from pathlib import Path

sys.path.insert(0, "packages/metamorph-contract/tests")
from contract_samples import PDF, build_document  # noqa: E402
from metamorph_contract import BundleWriter, Confidence, unresolved_id  # noqa: E402

out = Path(sys.argv[1])
shutil.rmtree(out, ignore_errors=True)

# A paged text (the contract's page markers): the reader shows where each page starts and links to it.
CLEAN = ("<!-- page 1 -->\nPERATURAN OTORITAS JASA KEUANGAN\nNOMOR 35/POJK.05/2018\n"
         "Mengingat : Keputusan Presiden Nomor 84/P;\nMEMUTUSKAN:\nPasal 1\nSatu.\n<!-- page 2 -->\nPasal 2\n"
         "Dua, sebagaimana dimaksud dalam Pasal 1.\n")
GAPPY = "PERATURAN OTORITAS JASA KEUANGAN\nNOMOR 10/POJK.05/2019\nMEMUTUSKAN:\nPasal 1\nSatu.\nPasal 3\nTiga.\n"
# No article found (its heading lost): material, so held until a curator corrects the text. A gap (GAPPY) is published.
TO_CORRECT = "PERATURAN OTORITAS JASA KEUANGAN\nNOMOR 7/POJK.05/2020\nMEMUTUSKAN:\nSatu.\n"
AMENDING = """PERATURAN OTORITAS JASA KEUANGAN
NOMOR 2/POJK.05/2021
MEMUTUSKAN:
Pasal I
Beberapa ketentuan dalam Peraturan Otoritas Jasa Keuangan Nomor 35/POJK.05/2018 diubah sebagai berikut:
1. Ketentuan Pasal 2 diubah sehingga berbunyi sebagai berikut:
Pasal 2
Dua, sebagaimana diubah.
Pasal II
Peraturan Otoritas Jasa Keuangan ini mulai berlaku pada tanggal diundangkan.
Ditetapkan di Jakarta
pada tanggal 1 Maret 2021
Diundangkan di Jakarta
pada tanggal 3 Maret 2021
"""
UNIDENTIFIED = "PERATURAN OTORITAS JASA KEUANGAN\nMEMUTUSKAN:\nPasal 1\nSatu.\nPasal 2\nDua.\n"


def doc(source_id, text, paged=False, **info):
    sample = build_document()
    text_ref = replace(sample.texts[0], sha256=hashlib.sha256(text.encode()).hexdigest(), paged=paged)
    return replace(
        sample,
        source=replace(sample.source, source_id=source_id),
        document=replace(sample.document, aliases=(), **info),
        texts=(text_ref,),
        provisions=(),
        citations=(),
    )


with BundleWriter(out, connector="ojk", connector_version="0.1.0", run_id="e2e-1") as bundle:
    bundle.put_blob(PDF)
    for text in (CLEAN, GAPPY, TO_CORRECT, AMENDING, UNIDENTIFIED):
        bundle.put_text(text)
    bundle.add(doc("e2e:clean", CLEAN, paged=True, id="ojk:pojk:2018:35", number="35", year=2018, citation="POJK 35/POJK.05/2018",
                   title="Penyelenggaraan Usaha Penjaminan"))
    bundle.add(doc("e2e:gappy", GAPPY, id="ojk:pojk:2019:10", number="10", year=2019, citation="POJK 10/POJK.05/2019",
                   title="Penyelenggaraan Usaha Pembiayaan Syariah"))
    bundle.add(doc("e2e:to-correct", TO_CORRECT, id="ojk:pojk:2020:7", number="7", year=2020, citation="POJK 7/POJK.05/2020",
                   title="Tata Kelola Perusahaan Pembiayaan"))
    bundle.add(doc("e2e:amending", AMENDING, id="ojk:pojk:2021:2", number="2", year=2021, citation="POJK 2/POJK.05/2021",
                   title="Perubahan atas Peraturan Otoritas Jasa Keuangan Nomor 35/POJK.05/2018",
                   dates=replace(build_document().document.dates, enacted=None, promulgated=None, effective=None)))
    bundle.add(doc("e2e:unidentified", UNIDENTIFIED, id=unresolved_id("ojk", "e2e:unidentified"),
                   id_confidence=Confidence.NONE, citation="POJK tanpa nomor", title="Peraturan yang belum dikenali"))
print("wrote", out, "unidentified:", unresolved_id("ojk", "e2e:unidentified"))
