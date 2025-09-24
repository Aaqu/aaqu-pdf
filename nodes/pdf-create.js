const { PDFDocument } = require("pdf-lib");

module.exports = function (RED) {
  function PDFCreateNode(config) {
    RED.nodes.createNode(this, config);

    const node = this;

    node.on("input", async function (msg) {
      try {
        msg = {
          pdfDoc: await PDFDocument.create(),
        };
        node.send(msg);
      } catch (err) {
        this.status({
          fill: "red",
          shape: "ring",
          text: "Error creating PDF object",
        });

        node.error(err);
      }
    });
  }
  RED.nodes.registerType("pdf-create", PDFCreateNode);
};
