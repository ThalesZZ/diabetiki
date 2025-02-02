package thaleszz.diabetiki.controller;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import thaleszz.diabetiki.controller.dto.UserDTO;
import thaleszz.diabetiki.controller.group.CreateEntity;
import thaleszz.diabetiki.domain.User;
import thaleszz.diabetiki.persistence.entity.UserEntity;
import thaleszz.diabetiki.persistence.repository.UserRepository;

@RestController
@RequestMapping("/user")
@Validated
@AllArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<UserDTO> create(@RequestBody @Validated(CreateEntity.class) UserDTO data) {
        User user = this.modelMapper.map(data, User.class);
        UserEntity userEntity = this.modelMapper.map(data, UserEntity.class);
        // TODO validate before persist
        return null;
    }

}
