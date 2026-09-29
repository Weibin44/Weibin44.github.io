import * as pdfjsLib from "../vendor/pdfjs/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "../vendor/pdfjs/pdf.worker.min.mjs",
  import.meta.url,
).href;

for (const figure of document.querySelectorAll("[data-pdf-preview]")) {
  const canvas = figure.querySelector("canvas");

  try {
    const pdf = await pdfjsLib.getDocument({ url: figure.dataset.pdfPreview }).promise;
    const page = await pdf.getPage(1);
    const original = page.getViewport({ scale: 1 });
    const width = figure.clientWidth || 600;
    const viewport = page.getViewport({ scale: width / original.width });
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const context = canvas.getContext("2d");

    canvas.width = Math.round(viewport.width * pixelRatio);
    canvas.height = Math.round(viewport.height * pixelRatio);
    await page.render({
      canvasContext: context,
      viewport,
      transform: [pixelRatio, 0, 0, pixelRatio, 0, 0],
    }).promise;

    canvas.style.display = "block";
  } catch (error) {
    console.error("Unable to render PDF preview:", error);
  }
}
