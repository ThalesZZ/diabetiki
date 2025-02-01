package thaleszz.diabetiki.persistence.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "TB_USER")
@Data
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID uuid;

    @OneToMany(mappedBy = "user")
    private List<HealthProfileEntity> healthProfiles;
    @OneToMany(mappedBy = "user")
    private List<SensitivityProfileEntity> sensitivityProfiles;

    private String name;
    private String email;
}
