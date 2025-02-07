package thaleszz.diabetiki.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thaleszz.diabetiki.controller.dto.health_profile.CreateHealthProfileDTO;
import thaleszz.diabetiki.controller.dto.health_profile.HealthProfileDTO;
import thaleszz.diabetiki.controller.dto.health_profile.UpdateHealthProfileDTO;
import thaleszz.diabetiki.domain.HealthProfile;
import thaleszz.diabetiki.service.HealthProfileService;

import java.util.UUID;

@RestController
@RequestMapping("/health_profile")
@AllArgsConstructor
public class HealthProfileController {
    private final HealthProfileService healthProfileService;

    @PostMapping
    public ResponseEntity<HealthProfileDTO> create(@RequestBody CreateHealthProfileDTO data) {
        HealthProfile domain = data.toDomain();
        HealthProfile healthProfile = this.healthProfileService.create(domain);
        HealthProfileDTO dto = new HealthProfileDTO(healthProfile);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    ResponseEntity<HealthProfileDTO> update(@PathVariable("id") UUID uuid,
                                            @RequestBody UpdateHealthProfileDTO data) {
        HealthProfile domain = data.toDomain();
        HealthProfile healthProfile = this.healthProfileService.update(uuid, domain);
        HealthProfileDTO dto = new HealthProfileDTO(healthProfile);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HealthProfileDTO> get(@PathVariable("id") UUID uuid) {
        HealthProfile healthProfile = this.healthProfileService.find(uuid);
        HealthProfileDTO dto = new HealthProfileDTO(healthProfile);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") UUID uuid) {
        this.healthProfileService.delete(uuid);
        return ResponseEntity.noContent().build();
    }

}
