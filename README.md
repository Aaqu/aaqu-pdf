## Important Information

Your support in the ongoing development of this library would be sincerely appreciated. 🙂

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-%23FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/mazuralbert)

_**The library requires testing and monitoring of RAM usage.**_

# @aaqu/node-red-aaqu-pdf

A [Node-RED](https://nodered.org/) node for operating on a PDF document.

This module provides a custom Node-RED node that:
- get single page from pdf
- display single page in flow

Get single page form pdf (file, http)

![example.png](img/example.png)

Display page in flow - need [node-red-contrib-image-tools](https://flows.nodered.org/node/node-red-contrib-image-tools) -> viewer

![example2.png](img/example2.png)

Create empty PDF and draw text

![create-pdf-draw-text.png](img/create-pdf-draw-text.png)

---

## Features

- Create empty PDF and draw text
- Select a single page from pdf to buffer
- Convert PDF page buffer to base64 image

---

## Installation

Run the following command inside your Node-RED user directory (typically `~/.node-red`):

```bash
npm install @aaqu/node-red-aaqu-pdf
```

Then restart Node-RED and the new node will appear in the editor palette.

---

## Nodes usage
#### pdf get page

![node-pdf-get-page.png](img/node-pdf-get-page.png)

- **msg.payload** - pdf buffer
- **msg.pdfPage** – optional runtime override for the page number (starting at `1`).

```text
pdf multi page buffer → [pdf get page] → pdf single page buffer
```

where:
- **pdf multi page buffer** input multi page buffer.
- **pdf get page** extracts the configured page (or the page defined in `msg.pdfPage`) default page no 1.
- **pdf single page buffer** return single page buffer.


#### pdf to img

![node-pdf-to-img.png](img/node-pdf-to-img.png)

- **msg.payload** - pdf buffer input

```text
pdf buffer → [pdf to img] → out base64
```

where:
- **pdf buffer** a pdf file as buffer.
- **pdf to img** extracts the page to image.
- **out base64** return image in base64 (to display use node-red-contrib-image-tools -> viewer).

#### pdf create

![node-pdf-create.png](img/node-pdf-create.png)

create PDF document

#### pdf add page

![node-pdf-add-page.png](img/node-pdf-add-page.png)

adding a page

#### pdf save

![node-pdf-pdf-save.png](img/node-pdf-save.png)

buil final PDF

#### pdf draw text

![node-pdf-draw-text](img/node-pdf-draw-text.png)

add text to page PDF

---

## Use cases

- Fast display pdf in flow editor.
- Extracting pages from automatically generated reports.
- Preparing single-page documents for downstream processing.
- Splitting large PDFs into smaller parts.
- Creating lightweight attachments for email or APIs.

---

## License

Apache-2.0 
