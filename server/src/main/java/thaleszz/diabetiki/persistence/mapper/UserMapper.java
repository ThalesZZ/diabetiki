package thaleszz.diabetiki.persistence.mapper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import thaleszz.diabetiki.domain.HealthProfile;
import thaleszz.diabetiki.domain.SensitivityProfile;
import thaleszz.diabetiki.domain.Thresholds;
import thaleszz.diabetiki.domain.User;
import thaleszz.diabetiki.persistence.entity.HealthProfileEntity;
import thaleszz.diabetiki.persistence.entity.SensitivityProfileEntity;
import thaleszz.diabetiki.persistence.entity.ThresholdsEntity;
import thaleszz.diabetiki.persistence.entity.UserEntity;

import java.util.List;

@Component
@AllArgsConstructor
public class UserMapper implements EntityMapper<User, UserEntity> {

    private final ThresholdsMapper thresholdsMapper;
    private final HealthProfileMapper healthProfileMapper;
    private final SensitivityProfileMapper sensitivityProfileMapper;

    @Override
    public UserEntity toModel(User domain) {
        UserEntity model = new UserEntity();
        return this.toModel(model, domain);
    }

    @Override
    public UserEntity toModel(UserEntity model, User domain) {
//        model.setUuid(domain.getUuid());
        model.setName(domain.getName());
        model.setEmail(domain.getEmail());

        ThresholdsEntity thresholdsModel = this.thresholdsMapper.toModel(domain.getThresholds());
        thresholdsModel.setUser(model);
        model.setThresholds(thresholdsModel);

        List<HealthProfileEntity> healthProfileModels = domain.getHealthProfiles()
                .stream().map(d -> {
                    HealthProfileEntity healthProfileModel = this.healthProfileMapper.toModel(d);
                    healthProfileModel.setUser(model);
                    return healthProfileModel;
                }).toList();
        model.setHealthProfiles(healthProfileModels);

        List<SensitivityProfileEntity> sensitivityProfileModels = domain.getSensitivityProfiles()
                .stream().map(d -> {
                    SensitivityProfileEntity sensitivityProfileModel = this.sensitivityProfileMapper.toModel(d);
                    sensitivityProfileModel.setUser(model);
                    return sensitivityProfileModel;
                }).toList();
        model.setSensitivityProfiles(sensitivityProfileModels);

        return model;
    }

    @Override
    public User toDomain(UserEntity model) {
        User domain = new User(model.getUuid());
        return this.toDomain(domain, model);
    }

    @Override
    public User toDomain(User domain, UserEntity model) {
        domain.setName(model.getName());
        domain.setEmail(model.getEmail());

        Thresholds thresholdsDomain = this.thresholdsMapper.toDomain(model.getThresholds());
        domain.setThresholds(thresholdsDomain);

        List<HealthProfile> healthProfileDomains = model.getHealthProfiles()
                .stream().map(this.healthProfileMapper::toDomain).toList();
        domain.setHealthProfiles(healthProfileDomains);

        List<SensitivityProfile> sensitivityProfileDomain = model.getSensitivityProfiles()
                .stream().map(this.sensitivityProfileMapper::toDomain).toList();
        domain.setSensitivityProfiles(sensitivityProfileDomain);

        return domain;
    }
}
