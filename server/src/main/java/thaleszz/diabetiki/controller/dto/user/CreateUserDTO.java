package thaleszz.diabetiki.controller.dto.user;

import jakarta.validation.constraints.*;
import thaleszz.diabetiki.controller.dto.health_profile.CreateHealthProfileDTO;
import thaleszz.diabetiki.controller.dto.thresholds.ThresholdsDTO;
import thaleszz.diabetiki.domain.SensitivityProfile;
import thaleszz.diabetiki.domain.User;

import java.util.Collections;
import java.util.Date;

public record CreateUserDTO(
        @NotBlank String name,
        @NotBlank @Email String email,
        // TODO internal validations not working
        @NotNull ThresholdsDTO thresholds,
        @NotNull CreateHealthProfileDTO healthProfile,
        @NotNull InitialSensitivityProfile sensitivityProfile
) {
    public CreateUserDTO {
        if (thresholds == null)
            throw new IllegalArgumentException("Thresholds must not be null.");
        else if (healthProfile == null)
            throw new IllegalArgumentException("Health profile must not be null.");
        else if (sensitivityProfile == null)
            throw new IllegalArgumentException("Sensitivity profile must not be null.");
    }

    public User toDomain() {
        return new User(
                null,
                this.name,
                this.email,
                this.thresholds.toDomain(),
                Collections.singletonList(this.sensitivityProfile.toDomain()),
                Collections.singletonList(this.healthProfile.toDomain())
        );
    }

    public record InitialSensitivityProfile(
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
}
