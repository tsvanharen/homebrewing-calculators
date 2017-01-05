$(function() {
    $("#seBtnClear").click(function() {
        $("#seVolumeBeerValue").val("");
        $("#seVolumeBeerAbv").val("");
        $("#seVolumeSpiritValue").val("");
        $("#seVolumeSpiritAbv").val("");
        $("#seAlert").hide();
    });

    $("#seBtnCalculate").click(function() {
        var $seVolumeBeerValue = $("#seVolumeBeerValue");
        var $seVolumeBeerAbv = $("#seVolumeBeerAbv");
        var $seVolumeSpiritValue = $("#seVolumeSpiritValue");
        var $seVolumeSpiritAbv = $("#seVolumeSpiritAbv");

        var beerVolume = parseFloat($.trim($seVolumeBeerValue.val()));
        var beerAbv = parseFloat($.trim($seVolumeBeerAbv.val()));
        var spiritVolume = parseFloat($.trim($seVolumeSpiritValue.val()));
        var spiritAbv = parseFloat($.trim($seVolumeSpiritAbv.val()));

        if (isNaN(beerVolume)) {
            beerVolume = 0.0;
            $seVolumeBeerValue.val("0.0");
        }

        if (isNaN(beerAbv)) {
            beerAbv = 0.0;
            $seVolumeBeerAbv.val("0.0");
        }

        if (isNaN(spiritVolume)) {
            spiritVolume = 0.0;
            $seVolumeSpiritValue.val("0.0");
        }

        if (isNaN(spiritAbv)) {
            spiritAbv = 0.0;
            $seVolumeSpiritAbv.val("0.0");
        }

        // (abv of spirit * volume of spirit) / (volume of beer + volume of spirit)
        var spiritAlcoholVolume = spiritVolume * spiritAbv;
        var totalVolume = beerVolume + spiritVolume;

        var addedAbv = spiritAlcoholVolume / totalVolume;
        var resultingAbv = beerAbv + addedAbv;

        if (isNaN(addedAbv)) {
            addedAbv = 0.0;
            resultingAbv = beerAbv;
        }

        $("#seAlert").show().html("This adds <strong>" + addedAbv + "%</strong> ABV to your beer, resulting in a beer with <strong>" + resultingAbv + "% ABV</strong>.");
    });
});