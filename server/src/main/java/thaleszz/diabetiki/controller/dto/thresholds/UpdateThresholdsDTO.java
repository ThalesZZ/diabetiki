package thaleszz.diabetiki.controller.dto.thresholds;

import jakarta.validation.constraints.PositiveOrZero;
import thaleszz.diabetiki.domain.Thresholds;

public record UpdateThresholdsDTO(
        @PositiveOrZero int hypoglycemiaThreshold,
        @PositiveOrZero int hyperglycemiaThreshold,
        @PositiveOrZero int superHypoglycemiaThreshold,
        @PositiveOrZero int superHyperglycemiaThreshold
) {
    public UpdateThresholdsDTO {
        boolean isChained = superHypoglycemiaThreshold <= hypoglycemiaThreshold
                && hypoglycemiaThreshold < hyperglycemiaThreshold
                && hyperglycemiaThreshold <= superHyperglycemiaThreshold;
        if (!isChained)
            throw new IllegalArgumentException("Values are not sorted correctly");
    }

    public Thresholds toDomain() {
        return new Thresholds(
                null,
                this.hypoglycemiaThreshold,
                this.hyperglycemiaThreshold,
                this.superHypoglycemiaThreshold,
                this.superHyperglycemiaThreshold
        );
    }
}
