package thaleszz.diabetiki.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import thaleszz.diabetiki.domain.Thresholds;
import thaleszz.diabetiki.persistence.entity.ThresholdsEntity;
import thaleszz.diabetiki.persistence.mapper.ThresholdsMapper;
import thaleszz.diabetiki.persistence.repository.ThresholdsRepository;

@Service
@AllArgsConstructor
public class ThresholdsService {
    private final ThresholdsRepository thresholdsRepository;
    private final ThresholdsMapper thresholdsMapper;

    public Thresholds update(String email, Thresholds data) {
        ThresholdsEntity thresholds = this.thresholdsRepository.findByUserEmail(email).orElseThrow();

        // TODO find a better way to map the updates
        thresholds.setHypoglycemiaThreshold(data.getHypoglycemiaThreshold());
        thresholds.setHyperglycemiaThreshold(data.getHyperglycemiaThreshold());
        thresholds.setSuperHypoglycemiaThreshold(data.getSuperHypoglycemiaThreshold());
        thresholds.setSuperHyperglycemiaThreshold(data.getSuperHyperglycemiaThreshold());

        ThresholdsEntity model = this.thresholdsMapper.toModel(thresholds, data);
        ThresholdsEntity saved = this.thresholdsRepository.save(model);
        return this.thresholdsMapper.toDomain(saved);
    }
}
