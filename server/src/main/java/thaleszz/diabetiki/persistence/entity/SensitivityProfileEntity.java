package thaleszz.diabetiki.persistence.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "TB_SENSITIVITY_PROFILE")
@Data
public class SensitivityProfileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID uuid;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private Date date;
    private int targetBloodGlucose;
    private float bloodGlucoseSensitivity;
    private float carbohydrateSensitivity;
}
