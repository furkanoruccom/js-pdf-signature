document.addEventListener('DOMContentLoaded', function () {
    const addSignatureButton = document.getElementById('addSignatureButton');
    const resultMessage = document.getElementById('resultMessage');
  
    addSignatureButton.addEventListener('click', async function () {
      const signatureImage = document.getElementById('signatureImage').files[0];
      const pdfFile = document.getElementById('pdfFile').files[0];
  
      if (!signatureImage || !pdfFile) {
        resultMessage.innerHTML = 'Lütfen bir imza görüntüsü ve bir PDF dosyası seçin.';
        return;
      }
  
      const signatureBlob = await signatureImage.arrayBuffer();
      const pdfBlob = await pdfFile.arrayBuffer();
  
      const pdfBytes = new Uint8Array(pdfBlob);
      const signatureBytes = new Uint8Array(signatureBlob);
  
      try {
        const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        
        const pngSignatureImage = await pdfDoc.embedPng(signatureBytes);

        const pngDims = pngSignatureImage.scale(0.5);
  
        const { width, height } = firstPage.getSize();
        const xPos = width / 2 - pngDims.width / 2;
        const yPos = height / 2 - pngDims.height / 2;
  
        firstPage.drawImage(pngSignatureImage, {
          x: xPos,
          y: yPos,
          width: pngDims.width,
          height: pngDims.height,
        });
  
        const modifiedPdfBytes = await pdfDoc.save();
  
        const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
  
        resultMessage.innerHTML = `<a href="${url}" download="imzali-dokuman.pdf">İmzalı PDF dosyasını indir</a>`;
      } catch (error) {
        resultMessage.innerHTML = 'Bir hata oluştu: ' + error.message;
      }
    });
  });
  