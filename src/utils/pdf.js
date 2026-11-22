import { asset } from './asset.js'

let loading

/** Loads the PDF library only when a PDF is needed, so the rest of the site stays light. */
export function loadPdfjs() {
  if (!loading) {
    loading = Promise.all([import('pdfjs-dist'), import('pdfjs-dist/build/pdf.worker.min.mjs?url')]).then(
      ([pdfjs, worker]) => {
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default
        return pdfjs
      },
    )
  }
  return loading
}

const documents = new Map()

/** Opens a PDF once and shares it between the card thumbnail and the viewer. */
export function openPdf(path) {
  if (!documents.has(path)) {
    documents.set(
      path,
      loadPdfjs().then((pdfjs) => pdfjs.getDocument({ url: asset(path) }).promise),
    )
    documents.get(path).catch(() => documents.delete(path))
  }
  return documents.get(path)
}
