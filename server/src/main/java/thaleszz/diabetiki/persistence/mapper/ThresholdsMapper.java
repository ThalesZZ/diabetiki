package thaleszz.diabetiki.persistence.mapper;

import org.springframework.stereotype.Component;
import thaleszz.diabetiki.domain.Thresholds;
import thaleszz.diabetiki.persistence.entity.ThresholdsEntity;

@Component
public class ThresholdsMapper implements EntityMapper<Thresholds, ThresholdsEntity> {
    @Override
    public ThresholdsEntity toModel(Thresholds domain) {
        ThresholdsEntity model = new ThresholdsEntity();
        return this.toModel(model, domain);
    }

    @Override
    public ThresholdsEntity toModel(ThresholdsEntity model, Thresholds domain) {
//        model.setUuid(domain.getUuid());
        model.setHypoglycemiaThreshold(domain.getHypoglycemiaThreshold());
        model.setHyperglycemiaThreshold(domain.getHyperglycemiaThreshold());
        model.setSuperHypoglycemiaThreshold(domain.getSuperHypoglycemiaThreshold());
        model.setSuperHyperglycemiaThreshold(domain.getSuperHyperglycemiaThreshold());

        return model;
    }

    @Override
    public Thresholds toDomain(ThresholdsEntity model) {
        Thresholds domain = new Thresholds(model.getUuid());
        return this.toDomain(domain, model);
    }

    @Override
    public Thresholds toDomain(Thresholds domain, ThresholdsEntity model) {
        domain.setHypoglycemiaThreshold(model.getHypoglycemiaThreshold());
        domain.setHyperglycemiaThreshold(model.getHyperglycemiaThreshold());
        domain.setSuperHypoglycemiaThreshold(model.getSuperHypoglycemiaThreshold());
        domain.setSuperHyperglycemiaThreshold(model.getSuperHyperglycemiaThreshold());

        return domain;
    }
}
