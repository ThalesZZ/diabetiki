package thaleszz.diabetiki.persistence.mapper;

import org.springframework.stereotype.Component;
import thaleszz.diabetiki.domain.HealthProfile;
import thaleszz.diabetiki.persistence.entity.HealthProfileEntity;

@Component
public class HealthProfileMapper implements EntityMapper<HealthProfile, HealthProfileEntity> {
    @Override
    public HealthProfileEntity toModel(HealthProfile domain) {
        HealthProfileEntity model = new HealthProfileEntity();
        return this.toModel(model, domain);
    }

    @Override
    public HealthProfileEntity toModel(HealthProfileEntity model, HealthProfile domain) {
//        model.setUuid(domain.getUuid());
        model.setDate(domain.getDate());
        model.setWeight(domain.getWeight());
        model.setHeight(domain.getHeight());

        return model;
    }

    @Override
    public HealthProfile toDomain(HealthProfileEntity model) {
        HealthProfile domain = new HealthProfile(model.getUuid());
        return this.toDomain(domain, model);
    }

    @Override
    public HealthProfile toDomain(HealthProfile domain, HealthProfileEntity model) {
        domain.setDate(model.getDate());
        domain.setWeight(model.getWeight());
        domain.setHeight(model.getHeight());

        return domain;
    }
}
