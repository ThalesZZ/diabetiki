package thaleszz.diabetiki.controller.dto.thresholds;

import jakarta.validation.constraints.PositiveOrZero;
import thaleszz.diabetiki.domain.Thresholds;

public record CreateThresholdsDTO(
        @PositiveOrZero int hypoglycemiaThreshold,
        @PositiveOrZero int hyperglycemiaThreshold,
        @PositiveOrZero int superHypoglycemiaThreshold,
        @PositiveOrZero int superHyperglycemiaThreshold
) {
    public CreateThresholdsDTO {
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
