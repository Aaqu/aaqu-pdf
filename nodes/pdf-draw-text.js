const { StandardFonts, rgb } = require("pdf-lib");

module.exports = function (RED) {
  function PDFDrawTextNode(config) {
    RED.nodes.createNode(this, config);
    this.text = config.text || "";
    this.fontSize = Number(config.fontSize || 12);
    this.posX = Number(config.posX || 0);
    this.poxY = Number(config.poxY || 0);
    const node = this;
    node.on("input", async function (msg) {
      try {
        const page = msg.page;

        const timesRomanFont = await msg.pdfDoc.embedFont(
          StandardFonts.TimesRoman,
        );

        page.drawText(node.text, {
          x: node.poxX,
          y: node.poxY,
          size: node.fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });

        msg = {
          page: page,
          pdfDoc: msg.pdfDoc,
        };

        node.send(msg);
      } catch (err) {
        this.status({
          fill: "red",
          shape: "ring",
          text: "Error drawing text in PDF",
        });

        node.error(err);
      }
    });
  }
  RED.nodes.registerType("pdf-draw-text", PDFDrawTextNode);
};
