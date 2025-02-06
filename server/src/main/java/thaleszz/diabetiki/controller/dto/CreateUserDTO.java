package thaleszz.diabetiki.controller.dto;

import jakarta.validation.constraints.*;
import thaleszz.diabetiki.domain.HealthProfile;
import thaleszz.diabetiki.domain.SensitivityProfile;
import thaleszz.diabetiki.domain.Thresholds;
import thaleszz.diabetiki.domain.User;

import java.util.Collections;
import java.util.Date;

public record CreateUserDTO(
        @NotBlank String name,
        @NotBlank @Email String email,
        // TODO internal validations not working
        @NotNull InitialThresholds thresholds,
        @NotNull InitialHealthProfile healthProfile,
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

    public record InitialThresholds(
            @PositiveOrZero int hypoglycemiaThreshold,
            @PositiveOrZero int hyperglycemiaThreshold,
            @PositiveOrZero int superHypoglycemiaThreshold,
            @PositiveOrZero int superHyperglycemiaThreshold
    ) {
        public InitialThresholds {
            boolean isChained = superHypoglycemiaThreshold <= hypoglycemiaThreshold
                    && hypoglycemiaThreshold < hyperglycemiaThreshold
                    && hyperglycemiaThreshold <= superHyperglycemiaThreshold;
            if (!isChained)
                throw new IllegalArgumentException(); // TODO message
        }

        public Thresholds toDomain() {
            return new Thresholds(
                    null,
                    this.hypoglycemiaThreshold,
                    this.hyperglycemiaThreshold,
                    this.superHypoglycemiaThreshold,
                    this.superHyperglycemiaThreshold
            );
        }
    }

    public record InitialHealthProfile(
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
