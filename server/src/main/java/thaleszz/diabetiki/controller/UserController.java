package thaleszz.diabetiki.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thaleszz.diabetiki.controller.dto.user.CreateUserDTO;
import thaleszz.diabetiki.controller.dto.user.UpdateUserDTO;
import thaleszz.diabetiki.controller.dto.user.UserDTO;
import thaleszz.diabetiki.domain.User;
import thaleszz.diabetiki.service.UserService;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserDTO> create(@RequestBody CreateUserDTO data) {
        User domain = data.toDomain();
        User user = this.userService.create(domain);
        UserDTO dto = new UserDTO(user);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{email}")
    ResponseEntity<UserDTO> update(@PathVariable("email") String email,
                                   @RequestBody UpdateUserDTO data) {
        User domain = data.toDomain();
        User user = this.userService.update(email, domain);
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
