$("#modalSignature").scroll(function () {
  $(".selectionArea").css({ "top": startPosition + $(this).scrollTop() + "px", "position": "absolute" });
});

$("#modalSignature").on('shown.bs.modal', function () {
  $(".btn-close-signature, .signaturebtns").toggle();
});
$(".btn-close-signature").click(function () {
  $(".btn-close-signature, .signaturebtns").toggle();
  $("#modalSignature").modal('hide');
});


$(document).ready(function () {
    $('#modalSignature').on('show.bs.modal', function () {
        var content = $('meta[name="viewport"]').attr('content');
        var newContent = content.replace('initial-scale=1', 'initial-scale=0');
        $('meta[name="viewport"]').attr('content', newContent);
    });

    $('#modalSignature').on('hidden.bs.modal', function () {
        var content = $('meta[name="viewport"]').attr('content');
        var newContent = content.replace('initial-scale=0', 'initial-scale=1');
        $('meta[name="viewport"]').attr('content', newContent);
    });
});