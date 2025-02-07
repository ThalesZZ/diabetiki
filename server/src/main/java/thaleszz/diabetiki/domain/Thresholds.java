package thaleszz.diabetiki.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Thresholds {
    private final UUID uuid;
    private int hypoglycemiaThreshold;
    private int hyperglycemiaThreshold;
    private int superHypoglycemiaThreshold;
    private int superHyperglycemiaThreshold;
}
