module.exports = function (RED) {
  function PDFSaveNode(config) {
    RED.nodes.createNode(this, config);

    var node = this;
    node.on("input", async function (msg) {
      try {
        msg = {
          payload: Buffer.from(await msg.pdfDoc.save()),
        };

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
  RED.nodes.registerType("pdf-save", PDFSaveNode);
};
