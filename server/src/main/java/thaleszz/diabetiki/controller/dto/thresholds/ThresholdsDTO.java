package thaleszz.diabetiki.controller.dto.thresholds;

import jakarta.validation.constraints.PositiveOrZero;
import thaleszz.diabetiki.domain.Thresholds;

public record ThresholdsDTO(
        @PositiveOrZero int hypoglycemiaThreshold,
        @PositiveOrZero int hyperglycemiaThreshold,
        @PositiveOrZero int superHypoglycemiaThreshold,
        @PositiveOrZero int superHyperglycemiaThreshold
) {
    public ThresholdsDTO {
        boolean isChained = superHypoglycemiaThreshold <= hypoglycemiaThreshold
                && hypoglycemiaThreshold < hyperglycemiaThreshold
                && hyperglycemiaThreshold <= superHyperglycemiaThreshold;
        if (!isChained)
            throw new IllegalArgumentException("Values are not sorted correctly");
    }

    public ThresholdsDTO(Thresholds domain) {
        this(
                domain.getHypoglycemiaThreshold(),
                domain.getHyperglycemiaThreshold(),
                domain.getSuperHypoglycemiaThreshold(),
                domain.getSuperHyperglycemiaThreshold()
        );
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
