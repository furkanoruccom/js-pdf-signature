try {
  (function ($) {
    'use strict';

    /*--------------------------------------------------------------
    ## Download Button Function
    ----------------------------------------------------------------*/
    $('#download_btn').on('touchstart click', function (e) {
      e.preventDefault(); // Prevents multiple firing of the event on mobile
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

      html2canvas(downloadSection[0], { 
        allowTaint: true, 
        useCORS: true,
        logging: true, // Enables logging for debugging
        scale: 0.5, // Reduces image size to support memory limitations on mobile
        width: cWidth,
        height: cHeight
      }).then(function (canvas) {
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

        // Check if the browser is on a mobile device
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          // Open PDF in a new window on mobile devices (workaround for download issues)
          var pdfWindow = window.open("");
          pdfWindow.document.write("<iframe width='100%' height='100%' src='" + pdf.output('datauristring') + "'></iframe>");
        } else {
          // For non-mobile browsers
          pdf.save('ivonne-invoice.pdf');
        }
      });

    });

  })(jQuery);

} catch (error) {
  alert("An error occurred during the download process: " + error.message);
}
