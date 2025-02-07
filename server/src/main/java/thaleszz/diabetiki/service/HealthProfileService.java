package thaleszz.diabetiki.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import thaleszz.diabetiki.domain.HealthProfile;
import thaleszz.diabetiki.persistence.entity.HealthProfileEntity;
import thaleszz.diabetiki.persistence.mapper.HealthProfileMapper;
import thaleszz.diabetiki.persistence.repository.HealthProfileRepository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class HealthProfileService {
    private final HealthProfileRepository healthProfileRepository;
    private final HealthProfileMapper healthProfileMapper;

    public HealthProfile create(HealthProfile data) {
        HealthProfileEntity model = this.healthProfileMapper.toModel(data);
        model.setDate(new Date());

        HealthProfileEntity saved = this.healthProfileRepository.save(model);
        return this.healthProfileMapper.toDomain(saved);
    }

    public HealthProfile update(UUID uuid, HealthProfile data) {
        HealthProfileEntity healthProfile = this.healthProfileRepository.findById(uuid).orElseThrow();
        HealthProfileEntity model = this.healthProfileMapper.toModel(healthProfile, data);
        HealthProfileEntity saved = this.healthProfileRepository.save(model);

        return this.healthProfileMapper.toDomain(saved);
    }

    public HealthProfile find(UUID uuid) {
        HealthProfileEntity healthProfile = this.healthProfileRepository.findById(uuid).orElseThrow();
        return this.healthProfileMapper.toDomain(healthProfile);
    }

    public List<HealthProfile> list(String userEmail) {
        List<HealthProfileEntity> healthProfiles = this.healthProfileRepository.findByUserEmail(userEmail);
        return healthProfiles.stream().map(this.healthProfileMapper::toDomain).toList();
    }

    public void delete(UUID uuid) {
        HealthProfileEntity healthProfile = this.healthProfileRepository.findById(uuid).orElseThrow();
        if (healthProfile.getUser().getHealthProfiles().size() == 1)
            throw new IllegalStateException("The user must have at least one health profile.");

        this.healthProfileRepository.delete(healthProfile);
    }
}
