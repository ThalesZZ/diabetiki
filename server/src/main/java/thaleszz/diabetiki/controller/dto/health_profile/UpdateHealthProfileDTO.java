package thaleszz.diabetiki.controller.dto.health_profile;

import jakarta.validation.constraints.Positive;
import thaleszz.diabetiki.domain.HealthProfile;

public record UpdateHealthProfileDTO(
        @Positive float weight,
        @Positive float height
) {
    public HealthProfile toDomain() {
        return new HealthProfile(
                null,
                null,
                this.weight,
                this.height
        );
    }
}
