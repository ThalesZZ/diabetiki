package thaleszz.diabetiki.controller.dto;

import jakarta.validation.constraints.NotBlank;

public record UserDTO(
        @NotBlank String name,
        @NotBlank String email
) {
}
