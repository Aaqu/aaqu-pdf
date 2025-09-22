// const pdfLib = require("pdf-lib");

module.exports = function (RED) {
  function PDFAddPageNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on("input", async function (msg) {
      try {
        const pdfDoc = msg.pdfDoc.addPage();
        msg = {
          pdfDoc,
        };

        node.send(msg);
      } catch (err) {
        this.status({
          fill: "red",
          shape: "square",
          text: "Error parsing PDF to Image",
        });

        node.error(err);
      }
    });
  }
  RED.nodes.registerType("pdf-add-page", PDFAddPageNode);
};
