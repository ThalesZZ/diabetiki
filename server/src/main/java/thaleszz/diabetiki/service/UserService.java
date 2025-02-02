package thaleszz.diabetiki.service;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import thaleszz.diabetiki.controller.dto.UserDTO;
import thaleszz.diabetiki.controller.group.CreateEntity;
import thaleszz.diabetiki.domain.User;
import thaleszz.diabetiki.persistence.entity.UserEntity;
import thaleszz.diabetiki.persistence.repository.UserRepository;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public User create(@Validated(CreateEntity.class) UserDTO data) {
        User user = this.modelMapper.map(data, User.class);
        UserEntity userEntity = this.modelMapper.map(user, UserEntity.class);
        userEntity.getThresholds().setUser(null);
        // TODO validate before persist
        UserEntity saved = this.userRepository.save(userEntity);
        return this.modelMapper.map(saved, User.class);
    }

    public User find(String email) {
        Optional<UserEntity> user = this.userRepository.findByEmail(email);
        return this.modelMapper.map(user, User.class);
    }
}
