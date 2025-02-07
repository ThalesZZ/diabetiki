package thaleszz.diabetiki.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import thaleszz.diabetiki.persistence.entity.HealthProfileEntity;

import java.util.List;
import java.util.UUID;

@Repository
public interface HealthProfileRepository extends JpaRepository<HealthProfileEntity, UUID> {
    List<HealthProfileEntity> findByUserEmail(String userEmail);
}
