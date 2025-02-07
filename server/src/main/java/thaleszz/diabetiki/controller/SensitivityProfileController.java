package thaleszz.diabetiki.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thaleszz.diabetiki.controller.dto.sensitivity_profile.CreateSensitivityProfileDTO;
import thaleszz.diabetiki.controller.dto.sensitivity_profile.SensitivityProfileDTO;
import thaleszz.diabetiki.controller.dto.sensitivity_profile.UpdateSensitivityProfileDTO;
import thaleszz.diabetiki.domain.SensitivityProfile;
import thaleszz.diabetiki.service.SensitivityProfileService;

import java.util.UUID;

@RestController
@RequestMapping("/sensitivity_profile")
@AllArgsConstructor
public class SensitivityProfileController {
    private final SensitivityProfileService sensitivityProfileService;

    @PostMapping
    public ResponseEntity<SensitivityProfileDTO> create(@RequestBody CreateSensitivityProfileDTO data) {
        SensitivityProfile domain = data.toDomain();
        SensitivityProfile sensitivityProfile = this.sensitivityProfileService.create(domain);
        SensitivityProfileDTO dto = new SensitivityProfileDTO(sensitivityProfile);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    ResponseEntity<SensitivityProfileDTO> update(@PathVariable("id") UUID uuid,
                                                 @RequestBody UpdateSensitivityProfileDTO data) {
        SensitivityProfile domain = data.toDomain();
        SensitivityProfile sensitivityProfile = this.sensitivityProfileService.update(uuid, domain);
        SensitivityProfileDTO dto = new SensitivityProfileDTO(sensitivityProfile);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SensitivityProfileDTO> get(@PathVariable("id") UUID uuid) {
        SensitivityProfile sensitivityProfile = this.sensitivityProfileService.find(uuid);
        SensitivityProfileDTO dto = new SensitivityProfileDTO(sensitivityProfile);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") UUID uuid) {
        this.sensitivityProfileService.delete(uuid);
        return ResponseEntity.noContent().build();
    }
}
