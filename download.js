(function ($) {
  'use strict';

  /*--------------------------------------------------------------
  ## İndirme Butonu İşlevi
  ----------------------------------------------------------------*/
  $('#download_btn').on('click', function () {
    var downloadSection = $('#pdfCanvasContainer');
    $(".selectionArea, .fa-trash, .rotate-handle, .ui-resizable-handle").css("visibility", "hidden");

    var cWidth = downloadSection.width();
    var cHeight = downloadSection.height();
    var topLeftMargin = 0;
    var pdfWidth = cWidth + topLeftMargin * 2;
    var pdfHeight = 1263;
    var canvasImageWidth = cWidth;
    var canvasImageHeight = cHeight;
    var totalPDFPages = Math.ceil(cHeight / 1263) - 1;

    html2canvas(downloadSection[0], { allowTaint: true, useCORS: true }).then(function (canvas) {
      var imgData = canvas.toDataURL('image/jpeg', 1.0);
      var pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);

      pdf.addImage(
        imgData,
        'JPG',
        topLeftMargin,
        topLeftMargin,
        canvasImageWidth,
        canvasImageHeight
      );

      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(pdfWidth, pdfHeight);
        pdf.addImage(
          imgData,
          'JPG',
          topLeftMargin,
          -(pdfHeight * i) + topLeftMargin * 0,
          canvasImageWidth,
          canvasImageHeight
        );
      }

      $(".selectionArea, .fa-trash, .rotate-handle, .ui-resizable-handle").css("visibility", "visible");

      pdf.save('ivonne-invoice.pdf');
    });
  });

})(jQuery);
