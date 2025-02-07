package thaleszz.diabetiki.controller.dto.health_profile;

import thaleszz.diabetiki.domain.HealthProfile;

import java.util.Date;
import java.util.UUID;

public record HealthProfileDTO(
        UUID uuid,
        Date date,
        float weight,
        float height
) {
    public HealthProfileDTO(HealthProfile healthProfile) {
        this(
                healthProfile.getUuid(),
                healthProfile.getDate(),
                healthProfile.getWeight(),
                healthProfile.getHeight()
        );
    }
}
