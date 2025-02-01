package thaleszz.diabetiki.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import thaleszz.diabetiki.persistence.entity.SensitivityProfileEntity;

import java.util.UUID;

@Repository
public interface SensitivityProfileRepository extends JpaRepository<SensitivityProfileEntity, UUID> {
}
