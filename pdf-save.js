const pdfLib = require("pdf-lib");

module.exports = function (RED) {
  function PDFSaveNode(config) {
    RED.nodes.createNode(this, config);

    var node = this;
    node.on("input", async function (msg) {
      try {
        msg.pdf = await msg.pdfDoc.save();

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
  RED.nodes.registerType("pdf-save", PDFSaveNode);
};
