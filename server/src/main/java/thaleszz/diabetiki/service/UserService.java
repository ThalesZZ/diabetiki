package thaleszz.diabetiki.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import thaleszz.diabetiki.domain.User;
import thaleszz.diabetiki.persistence.entity.UserEntity;
import thaleszz.diabetiki.persistence.mapper.UserMapper;
import thaleszz.diabetiki.persistence.repository.UserRepository;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public User create(User user) {
        UserEntity model = this.userMapper.toModel(user);
        // TODO validate before persist
        UserEntity saved = this.userRepository.save(model);
        return this.userMapper.toDomain(saved);
    }

    public User find(String email) {
        UserEntity user = this.userRepository.findByEmail(email).orElseThrow();
        return this.userMapper.toDomain(user);
    }

    public void delete(String email) {
        UserEntity user = this.userRepository.findByEmail(email).orElseThrow();
        this.userRepository.delete(user);
    }
}
