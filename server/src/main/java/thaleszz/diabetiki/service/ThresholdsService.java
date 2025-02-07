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

    public Thresholds update(String userEmail, Thresholds data) {
        ThresholdsEntity thresholds = this.thresholdsRepository.findByUserEmail(userEmail).orElseThrow();
        ThresholdsEntity model = this.thresholdsMapper.toModel(thresholds, data);
        ThresholdsEntity saved = this.thresholdsRepository.save(model);

        return this.thresholdsMapper.toDomain(saved);
    }
}
