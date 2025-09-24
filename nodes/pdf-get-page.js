var pdfLib = require("pdf-lib");

module.exports = function (RED) {
  function PDFGetPageNode(config) {
    RED.nodes.createNode(this, config);
    this.pdfPage = config.pdfPage;
    var node = this;
    node.on("input", async function (msg) {
      try {
        const pdfDoc = await pdfLib.PDFDocument.load(msg.payload);
        //const pages = pdfDoc.getPageCount();
        // console.log(pages);

        const newPDF = await pdfLib.PDFDocument.create();

        const copiedPages = await newPDF.copyPages(pdfDoc, [node.pdfPage - 1]);
        const [page] = copiedPages;

        newPDF.addPage(page);
        const pdfBytes = await newPDF.save();

        msg.payload = Buffer.from(pdfBytes);
        node.send(msg);
      } catch (err) {
        this.status({
          fill: "red",
          shape: "ring",
          text: "Error parsing PDF",
        });

        node.error(err);
      }
    });
  }
  RED.nodes.registerType("pdf-get-page", PDFGetPageNode);
};
