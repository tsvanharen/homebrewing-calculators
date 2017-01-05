$(function() {
    $("#aauBtnClear").click(function() {
        $("#aauAA").val("").parent().removeClass("has-success");
        $("#aauWeightOz").val("").parent().removeClass("has-success");
        $("#aauAAU").val("").parent().removeClass("has-success");
    });

    $("#aauBtnCalculate").click(function() {
        var $aauAA = $("#aauAA");
        var $aauWeightOz = $("#aauWeightOz");
        var $aauAAU = $("#aauAAU");

        var alphaAcidPercentage = parseFloat($.trim($aauAA.val()));
        var weightOz = parseFloat($.trim($aauWeightOz.val()));
        var alphaAcidUnits = parseFloat($.trim($aauAAU.val()));

        if (isNaN(alphaAcidPercentage)) {
            alphaAcidPercentage = 0.0;
            $aauAA.val("0.0");
        }

        if (isNaN(weightOz)) {
            weightOz = 0.0;
            $aauWeightOz.val("0.0");
        }

        if (isNaN(alphaAcidUnits)) {
            alphaAcidUnits = 0.0;
            $aauAAU.val("0.0");
        }

        // AAUs = % alpha x oz.
        var hasAlphaAcidPercentage = (alphaAcidPercentage > 0);
        var hasWeightOz = (weightOz > 0);
        var hasAlphaAcidUnits = (alphaAcidUnits > 0);

        if (hasAlphaAcidPercentage && !hasWeightOz && hasAlphaAcidUnits) {
            // calculate weight
            weightOz = alphaAcidUnits / alphaAcidPercentage;

            if (isNaN(weightOz)) {
                weightOz = 0.0;
            }

            $aauWeightOz.val(weightOz).parent().addClass("has-success");
        } else {
            // calculate AAU
            alphaAcidUnits = alphaAcidPercentage * weightOz;

            if (isNaN(alphaAcidUnits)) {
                alphaAcidUnits = 0.0;
            }

            $aauAAU.val(alphaAcidUnits).parent().addClass("has-success");
        }
    });
});