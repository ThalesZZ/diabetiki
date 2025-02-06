package thaleszz.diabetiki.controller.dto;

import jakarta.validation.constraints.NotBlank;
import thaleszz.diabetiki.domain.User;

public record UpdateUserDTO(
        @NotBlank String name,
        @NotBlank String email
) {
    public User toDomain() {
        return new User(
                null,
                this.name,
                this.email,
                null,
                null,
                null
        );
    }
}
