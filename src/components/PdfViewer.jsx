// components/PdfViewer.jsx
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1); // start on first page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function goToNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }

  return (
    <div>
      <button onClick={goToPreviousPage} disabled={pageNumber <= 1}>
        Previous
      </button>
      <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
        Next
      </button>

      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        renderMode="canvas"
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
};

export default PdfViewer;
