const pdfLib = require("pdf-lib");

module.exports = function (RED) {
  function PDFCreateNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on("input", function (msg) {
      pdfLib.PDFDocument.create()
        .then((doc) => {
          msg.pdfDoc = doc;
          node.send(msg);
        })
        .catch((err) => {
          this.status({
            fill: "red",
            shape: "square",
            text: "Error parsing PDF to Image",
          });

          node.error(err);
        });

      //       try {
      //         msg = {
      //           pdfDoc: await pdfLib.PDFDocument.create(),
      //         };
      // msg.pdfDoc = await pdfLib.PDFDocument.create(msg);=
      //         node.send(msg);
      //       } catch (err) {
      //         this.status({
      //           fill: "red",
      //           shape: "square",
      //           text: "Error parsing PDF to Image",
      //         });
      //
      //         node.error(err);
      //       }
    });
  }
  RED.nodes.registerType("pdf-create", PDFCreateNode);
};
