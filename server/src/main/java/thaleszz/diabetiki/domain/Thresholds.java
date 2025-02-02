package thaleszz.diabetiki.domain;

import lombok.Data;

@Data
public class Thresholds {
    private int hypoglycemiaThreshold;
    private int hyperglycemiaThreshold;
    private int superHypoglycemiaThreshold;
    private int superHyperglycemiaThreshold;
}
