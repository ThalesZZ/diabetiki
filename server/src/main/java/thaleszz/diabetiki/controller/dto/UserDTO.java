package thaleszz.diabetiki.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import thaleszz.diabetiki.controller.group.CreateEntity;

import java.util.List;
import java.util.UUID;

public record UserDTO(
        @Null(groups = {CreateEntity.class}) UUID uuid,
        @NotBlank String name,
        @NotBlank @Email String email,
        // TODO validations are not working below
        @JsonProperty(required = true) ThresholdsDTO thresholds,
        @NotNull @Size(groups = {CreateEntity.class}, min = 1, max = 1) List<HealthProfileDTO> healthProfiles,
        @NotNull @Size(groups = {CreateEntity.class}, min = 1, max = 1) List<SensitivityProfileDTO> sensitivityProfiles
) {
}
