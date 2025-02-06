package thaleszz.diabetiki.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thaleszz.diabetiki.controller.dto.CreateUserDTO;
import thaleszz.diabetiki.controller.dto.UserDTO;
import thaleszz.diabetiki.domain.User;
import thaleszz.diabetiki.service.UserService;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserDTO> create(@RequestBody CreateUserDTO data) {
        User user = this.userService.create(data.toDomain());
        UserDTO dto = new UserDTO(user);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserDTO> get(@PathVariable("email") String email) {
        User user = this.userService.find(email);
        UserDTO dto = new UserDTO(user);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Object> delete(@PathVariable("email") String email) {
        this.userService.delete(email);
        return ResponseEntity.noContent().build();
    }

}
