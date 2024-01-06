$('#download_btn').on('click', function () {
  var downloadSection = $('#pdfCanvasContainer');
  $(".selectionArea, .fa-trash, .rotate-handle, .ui-resizable-handle").css("display", "none");

  var cWidth = downloadSection.width();
  var cHeight = downloadSection.height();
  var topLeftMargin = 0;
  var pdfWidth = cWidth + topLeftMargin * 2;
  var pdfHeight = 1515;
  var canvasImageWidth = cWidth;
  var canvasImageHeight = cHeight;
  var totalPDFPages = Math.ceil(cHeight / 1515) - 1;

  html2canvas(downloadSection[0], { allowTaint: true, useCORS: true }).then(function (canvas) {
      var imgData = canvas.toDataURL('image/jpeg', 1.0);
      var pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);

      pdf.addImage(imgData, 'JPG', topLeftMargin, topLeftMargin, canvasImageWidth, canvasImageHeight);

      for (var i = 2; i <= totalPDFPages; i++) {
          pdf.addPage(pdfWidth, pdfHeight);
          pdf.addImage(imgData, 'JPG', topLeftMargin, -(pdfHeight * (i - 1)) + topLeftMargin, canvasImageWidth, canvasImageHeight);
      }

      $(".selectionArea, .fa-trash, .rotate-handle, .ui-resizable-handle").css("display", "block");
      pdf.save("download.pdf");
  });
});
