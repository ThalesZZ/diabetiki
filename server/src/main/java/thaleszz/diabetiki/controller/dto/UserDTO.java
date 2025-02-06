package thaleszz.diabetiki.controller.dto;

import jakarta.validation.constraints.NotBlank;
import thaleszz.diabetiki.domain.User;

public record UserDTO(
        @NotBlank String name,
        @NotBlank String email
) {
    public UserDTO(User user) {
        this(user.getName(), user.getEmail());
    }
}
