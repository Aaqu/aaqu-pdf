const { StandardFonts, rgb } = require("pdf-lib");

function hexToRgbObject(hex) {
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }

  const bigint = parseInt(hex, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;

  return { r, g, b };
}

module.exports = function (RED) {
  function PDFDrawTextNode(config) {
    RED.nodes.createNode(this, config);

    this.text = config.text || "";
    this.font = config.font || "";
    this.fontSize = Number(config.fontSize || 12);
    this.posX = Number(config.posX || 0);
    this.posY = Number(config.posY || 0);
    this.color = config.color || "#000000";

    const node = this;

    node.on("input", async function (msg) {
      try {
        const page = msg.page;

        const timesRomanFont = await msg.pdfDoc.embedFont(
          StandardFonts[node.font],
        );
        const rgbColor = hexToRgbObject(node.color);
        page.drawText(node.text, {
          x: node.posX,
          y: node.posY,
          size: node.fontSize,
          font: timesRomanFont,
          color: rgb(rgbColor.r, rgbColor.g, rgbColor.b),
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
