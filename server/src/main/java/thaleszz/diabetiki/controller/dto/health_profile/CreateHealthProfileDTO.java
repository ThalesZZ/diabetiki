package thaleszz.diabetiki.controller.dto.health_profile;

import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import thaleszz.diabetiki.domain.HealthProfile;

import java.util.Date;

public record CreateHealthProfileDTO(
        @PastOrPresent Date date,
        @Positive float weight,
        @Positive float height
) {
    public HealthProfile toDomain() {
        return new HealthProfile(
                null,
                this.date,
                this.weight,
                this.height
        );
    }
}
