package thaleszz.diabetiki.controller.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import thaleszz.diabetiki.controller.group.CreateEntity;

import java.util.Date;
import java.util.UUID;

public record HealthProfileDTO(
        @Null(groups = {CreateEntity.class}) UUID uuid,
        @NotNull @PastOrPresent Date date,
        @NotNull @Positive Float weight,
        @NotNull @Positive Float height
) {
}
