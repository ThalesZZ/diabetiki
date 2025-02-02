package thaleszz.diabetiki.controller.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import thaleszz.diabetiki.controller.group.CreateEntity;

import java.util.Date;
import java.util.UUID;

public record SensitivityProfileDTO(
        @Null(groups = {CreateEntity.class}) UUID uuid,
        @NotNull @PastOrPresent Date date,
        @NotNull @Positive Integer targetBloodGlucose,
        @NotNull @Positive Float bloodGlucoseSensitivity,
        @NotNull @Positive Float carbohydrateSensitivity
) {
}
