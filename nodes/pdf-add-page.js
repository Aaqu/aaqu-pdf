module.exports = function (RED) {
  function PDFAddPageNode(config) {
    RED.nodes.createNode(this, config);
    this.width = Number(config.width || 595);
    this.height = Number(config.height || 842);
    const node = this;
    node.on("input", function (msg) {
      try {
        const page = msg.pdfDoc.addPage([node.width, node.height]);

        msg = {
          page: page,
          pdfDoc: msg.pdfDoc,
        };

        node.send(msg);
      } catch (err) {
        this.status({
          fill: "red",
          shape: "ring",
          text: "Error adding PDF page",
        });

        node.error(err);
      }
    });
  }
  RED.nodes.registerType("pdf-add-page", PDFAddPageNode);
};
