package thaleszz.diabetiki.controller.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record ThresholdsDTO(
        @NotNull @PositiveOrZero Integer hypoglycemiaThreshold,
        @NotNull @PositiveOrZero Integer hyperglycemiaThreshold,
        @NotNull @PositiveOrZero Integer superHypoglycemiaThreshold,
        @NotNull @PositiveOrZero Integer superHyperglycemiaThreshold
) {
    @AssertTrue
    public boolean compareThresholds() {
        return this.superHypoglycemiaThreshold <= this.hypoglycemiaThreshold
                && this.hypoglycemiaThreshold < this.hyperglycemiaThreshold
                && this.hyperglycemiaThreshold <= this.superHyperglycemiaThreshold;
    }
}
