package thaleszz.diabetiki.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thaleszz.diabetiki.controller.dto.UserDTO;
import thaleszz.diabetiki.domain.User;
import thaleszz.diabetiki.service.UserService;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserDTO> create(@RequestBody UserDTO data) {
        User user = this.userService.create(data);
        return ResponseEntity.noContent().build(); // TODO
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserDTO> get(@PathVariable("email") String email) {
        User user = this.userService.find(email);
        return ResponseEntity.noContent().build(); // TODO
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Object> delete(@PathVariable("email") String email){
        this.userService.delete(email);
        return ResponseEntity.noContent().build();
    }

}
