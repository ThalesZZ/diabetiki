package thaleszz.diabetiki.controller.dto.sensitivity_profile;

import thaleszz.diabetiki.domain.SensitivityProfile;

import java.util.Date;
import java.util.UUID;

public record SensitivityProfileDTO(
        UUID uuid,
        Date date,
        int targetBloodGlucose,
        float bloodGlucoseSensitivity,
        float carbohydrateSensitivity
) {
    public SensitivityProfileDTO(SensitivityProfile domain) {
        this(
                domain.getUuid(),
                domain.getDate(),
                domain.getTargetBloodGlucose(),
                domain.getBloodGlucoseSensitivity(),
                domain.getCarbohydrateSensitivity()
        );
    }
}
