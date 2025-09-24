const { pdf } = require("pdf-to-img");

module.exports = function (RED) {
  function PDFToImageNode(config) {
    RED.nodes.createNode(this, config);

    this.scale = config.scale;

    const node = this;

    node.on("input", async function (msg) {
      try {
        const pdfBuffer = msg.payload;

        const document = await pdf(pdfBuffer, { scale: node.scale });
        const page12buffer = await document.getPage(1);

        msg.payload = page12buffer;
        node.send(msg);
      } catch (err) {
        this.status({
          fill: "red",
          shape: "ring",
          text: "Error parsing PDF to Image",
        });

        node.error(err);
      }
    });
  }
  RED.nodes.registerType("pdf-to-img", PDFToImageNode);
};
