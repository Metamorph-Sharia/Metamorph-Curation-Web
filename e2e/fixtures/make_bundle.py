"""The curation web app's end-to-end fixture: one small contract v2 bundle with four documents.

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

CLEAN = "PERATURAN OTORITAS JASA KEUANGAN\nNOMOR 35/POJK.05/2018\nMengingat : Keputusan Presiden Nomor 84/P;\nMEMUTUSKAN:\nPasal 1\nSatu.\nPasal 2\nDua.\n"
GAPPY = "PERATURAN OTORITAS JASA KEUANGAN\nNOMOR 10/POJK.05/2019\nMEMUTUSKAN:\nPasal 1\nSatu.\nPasal 3\nTiga.\n"
TO_CORRECT = "PERATURAN OTORITAS JASA KEUANGAN\nNOMOR 7/POJK.05/2020\nMEMUTUSKAN:\nPasal 1\nSatu.\nPasal 3\nTiga.\n"
UNIDENTIFIED = "PERATURAN OTORITAS JASA KEUANGAN\nMEMUTUSKAN:\nPasal 1\nSatu.\nPasal 2\nDua.\n"


def doc(source_id, text, **info):
    sample = build_document()
    text_ref = replace(sample.texts[0], sha256=hashlib.sha256(text.encode()).hexdigest(), paged=False)
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
    for text in (CLEAN, GAPPY, TO_CORRECT, UNIDENTIFIED):
        bundle.put_text(text)
    bundle.add(doc("e2e:clean", CLEAN, id="ojk:pojk:2018:35", number="35", year=2018, citation="POJK 35/POJK.05/2018",
                   title="Penyelenggaraan Usaha Penjaminan"))
    bundle.add(doc("e2e:gappy", GAPPY, id="ojk:pojk:2019:10", number="10", year=2019, citation="POJK 10/POJK.05/2019",
                   title="Penyelenggaraan Usaha Pembiayaan Syariah"))
    bundle.add(doc("e2e:to-correct", TO_CORRECT, id="ojk:pojk:2020:7", number="7", year=2020, citation="POJK 7/POJK.05/2020",
                   title="Tata Kelola Perusahaan Pembiayaan"))
    bundle.add(doc("e2e:unidentified", UNIDENTIFIED, id=unresolved_id("ojk", "e2e:unidentified"),
                   id_confidence=Confidence.NONE, citation="POJK tanpa nomor", title="Peraturan yang belum dikenali"))
print("wrote", out, "unidentified:", unresolved_id("ojk", "e2e:unidentified"))
