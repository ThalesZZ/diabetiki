package thaleszz.diabetiki.controller.dto.thresholds;

import thaleszz.diabetiki.domain.Thresholds;

import java.util.UUID;

public record ThresholdsDTO(
        UUID uuid,
        int hypoglycemiaThreshold,
        int hyperglycemiaThreshold,
        int superHypoglycemiaThreshold,
        int superHyperglycemiaThreshold
) {
    public ThresholdsDTO(Thresholds domain) {
        this(
                domain.getUuid(),
                domain.getHypoglycemiaThreshold(),
                domain.getHyperglycemiaThreshold(),
                domain.getSuperHypoglycemiaThreshold(),
                domain.getSuperHyperglycemiaThreshold()
        );
    }
}
