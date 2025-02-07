package thaleszz.diabetiki.controller.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import thaleszz.diabetiki.controller.dto.health_profile.CreateHealthProfileDTO;
import thaleszz.diabetiki.controller.dto.sensitivity_profile.CreateSensitivityProfileDTO;
import thaleszz.diabetiki.controller.dto.thresholds.CreateThresholdsDTO;
import thaleszz.diabetiki.domain.User;

import java.util.Collections;

public record CreateUserDTO(
        @NotBlank String name,
        @NotBlank @Email String email,
        // TODO internal validations not working
        @NotNull CreateThresholdsDTO thresholds,
        @NotNull CreateHealthProfileDTO healthProfile,
        @NotNull CreateSensitivityProfileDTO sensitivityProfile
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
}
