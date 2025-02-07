package thaleszz.diabetiki.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import thaleszz.diabetiki.domain.SensitivityProfile;
import thaleszz.diabetiki.persistence.entity.SensitivityProfileEntity;
import thaleszz.diabetiki.persistence.mapper.SensitivityProfileMapper;
import thaleszz.diabetiki.persistence.repository.SensitivityProfileRepository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class SensitivityProfileService {
    private final SensitivityProfileRepository sensitivityProfileRepository;
    private final SensitivityProfileMapper sensitivityProfileMapper;

    public SensitivityProfile create(SensitivityProfile data) {
        SensitivityProfileEntity model = this.sensitivityProfileMapper.toModel(data);
        model.setDate(new Date());

        SensitivityProfileEntity saved = this.sensitivityProfileRepository.save(model);
        return this.sensitivityProfileMapper.toDomain(saved);
    }

    public SensitivityProfile update(UUID uuid, SensitivityProfile data) {
        SensitivityProfileEntity sensitivityProfile = this.sensitivityProfileRepository.findById(uuid).orElseThrow();
        SensitivityProfileEntity model = this.sensitivityProfileMapper.toModel(sensitivityProfile, data);
        SensitivityProfileEntity saved = this.sensitivityProfileRepository.save(model);
        return this.sensitivityProfileMapper.toDomain(saved);
    }

    public SensitivityProfile find(UUID uuid) {
        SensitivityProfileEntity sensitivityProfile = this.sensitivityProfileRepository.findById(uuid).orElseThrow();
        return this.sensitivityProfileMapper.toDomain(sensitivityProfile);
    }

    public List<SensitivityProfile> list(String userEmail) {
        List<SensitivityProfileEntity> sensitivityProfiles = this.sensitivityProfileRepository.findByUserEmail(userEmail);
        return sensitivityProfiles.stream().map(this.sensitivityProfileMapper::toDomain).toList();
    }

    public void delete(UUID uuid) {
        SensitivityProfileEntity sensitivityProfile = this.sensitivityProfileRepository.findById(uuid).orElseThrow();
        if (sensitivityProfile.getUser().getSensitivityProfiles().size() == 1)
            throw new IllegalStateException("The user must have at least one sensitivity profile");

        this.sensitivityProfileRepository.delete(sensitivityProfile);
    }
}
