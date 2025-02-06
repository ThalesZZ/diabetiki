package thaleszz.diabetiki.controller.dto.user;

import thaleszz.diabetiki.domain.User;

public record UserDTO(
        String name,
        String email
) {
    public UserDTO(User user) {
        this(user.getName(), user.getEmail());
    }
}
