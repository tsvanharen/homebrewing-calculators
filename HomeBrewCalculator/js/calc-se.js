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

        // ((Volume1 X ABV1) + (Volume2 X ABV2)) / (Volume1 + Volume2)
        var spiritAlcoholVolume = spiritVolume * spiritAbv;
        var beerAlcoholVolume = beerVolume * beerAbv;
        var totalVolume = beerVolume + spiritVolume;
        var resultingAbv = (spiritAlcoholVolume + beerAlcoholVolume) / totalVolume;

        if (totalVolume <= 0.0) {
            $("#seAlert").show().html("Total volume should be greater than zero");
            return;
        }

        var msg = "";
        var abvChange = resultingAbv - beerAbv;

        if (abvChange > 0.0) {
            msg = "This adds <strong>" + abvChange + "% ABV</strong> to your beer, resulting in a beer with <strong>" + resultingAbv + "% ABV</strong>.";
        } else if (abvChange == 0.0) {
            // no change in ABV
            msg = "This results in no change in ABV to your beer, resulting in a beer with <strong>" + resultingAbv + "% ABV</strong>.";
        } else {
            msg = "This subtracts <strong>" + Math.abs(abvChange) + "% ABV</strong> from your beer, resulting in a beer with <strong>" + resultingAbv + "% ABV</strong>.";
        }

        $("#seAlert").show().html(msg);
    });
});