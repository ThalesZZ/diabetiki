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
        UserEntity saved = this.userRepository.save(model);
        return this.userMapper.toDomain(saved);
    }

    public User update(String email, User data) {
        UserEntity user = this.userRepository.findByEmail(email).orElseThrow();

        // TODO find a better way to map the updates
        user.setName(data.getName());
        user.setEmail(data.getEmail());

        UserEntity model = this.userMapper.toModel(user, data);
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
