package thaleszz.diabetiki.controller.dto.sensitivity_profile;

import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import thaleszz.diabetiki.domain.SensitivityProfile;

import java.util.Date;

public record UpdateSensitivityProfileDTO(
        @PastOrPresent Date date,
        @Positive int targetBloodGlucose,
        @Positive float bloodGlucoseSensitivity,
        @Positive float carbohydrateSensitivity
) {
    public SensitivityProfile toDomain() {
        return new SensitivityProfile(
                null,
                this.date,
                this.targetBloodGlucose,
                this.bloodGlucoseSensitivity,
                this.carbohydrateSensitivity
        );
    }
}
