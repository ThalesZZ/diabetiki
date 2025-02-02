package thaleszz.diabetiki.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import thaleszz.diabetiki.persistence.entity.ThresholdsEntity;

import java.util.UUID;

@Repository
public interface ThresholdsRepository extends JpaRepository<ThresholdsEntity, UUID> {
}
