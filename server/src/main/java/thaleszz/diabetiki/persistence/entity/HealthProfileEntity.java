package thaleszz.diabetiki.persistence.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "TB_HEALTH_PROFILE")
@Data
public class HealthProfileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID uuid;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private Date date;
    private float weight;
    private float height;
}
