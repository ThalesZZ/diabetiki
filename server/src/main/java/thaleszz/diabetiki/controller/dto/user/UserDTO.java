package thaleszz.diabetiki.controller.dto.user;

import thaleszz.diabetiki.domain.User;

import java.util.UUID;

public record UserDTO(
        UUID uuid,
        String name,
        String email
) {
    public UserDTO(User user) {
        this(user.getUuid(), user.getName(), user.getEmail());
    }
}
