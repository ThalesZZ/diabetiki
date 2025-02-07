package thaleszz.diabetiki.persistence.mapper;

import org.springframework.stereotype.Component;
import thaleszz.diabetiki.domain.SensitivityProfile;
import thaleszz.diabetiki.persistence.entity.SensitivityProfileEntity;

@Component
public class SensitivityProfileMapper implements EntityMapper<SensitivityProfile, SensitivityProfileEntity> {
    @Override
    public SensitivityProfileEntity toModel(SensitivityProfile domain) {
        SensitivityProfileEntity model = new SensitivityProfileEntity();
        return this.toModel(model, domain);
    }

    @Override
    public SensitivityProfileEntity toModel(SensitivityProfileEntity model, SensitivityProfile domain) {
//        model.setUuid(domain.getUuid());

        if (domain.getDate() != null)
            model.setDate(domain.getDate());

        model.setTargetBloodGlucose(domain.getTargetBloodGlucose());
        model.setCarbohydrateSensitivity(domain.getCarbohydrateSensitivity());
        model.setBloodGlucoseSensitivity(domain.getBloodGlucoseSensitivity());

        return model;
    }

    @Override
    public SensitivityProfile toDomain(SensitivityProfileEntity model) {
        SensitivityProfile domain = new SensitivityProfile(model.getUuid());
        return this.toDomain(domain, model);
    }

    @Override
    public SensitivityProfile toDomain(SensitivityProfile domain, SensitivityProfileEntity model) {
        domain.setDate(model.getDate());
        domain.setTargetBloodGlucose(model.getTargetBloodGlucose());
        domain.setCarbohydrateSensitivity(model.getCarbohydrateSensitivity());
        domain.setBloodGlucoseSensitivity(model.getBloodGlucoseSensitivity());

        return domain;
    }
}
