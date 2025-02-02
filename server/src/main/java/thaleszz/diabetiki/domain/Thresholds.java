package thaleszz.diabetiki.domain;

import lombok.Data;

import java.util.UUID;

@Data
public class Thresholds {
    private UUID uuid;
    private int hypoglycemiaThreshold;
    private int hyperglycemiaThreshold;
    private int superHypoglycemiaThreshold;
    private int superHyperglycemiaThreshold;
}
