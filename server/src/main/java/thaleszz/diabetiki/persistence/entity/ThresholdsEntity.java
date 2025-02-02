package thaleszz.diabetiki.persistence.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "TB_THRESHOLDS")
@Data
public class ThresholdsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID uuid;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private int hypoglycemiaThreshold;
    private int hyperglycemiaThreshold;
    private int superHypoglycemiaThreshold;
    private int superHyperglycemiaThreshold;
}
