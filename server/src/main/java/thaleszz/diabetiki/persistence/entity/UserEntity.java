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

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private ThresholdsEntity thresholds;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<HealthProfileEntity> healthProfiles;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<SensitivityProfileEntity> sensitivityProfiles;

    private String name;
    private String email;
}
