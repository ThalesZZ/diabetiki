package thaleszz.diabetiki.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thaleszz.diabetiki.controller.dto.thresholds.ThresholdsDTO;
import thaleszz.diabetiki.domain.Thresholds;
import thaleszz.diabetiki.service.ThresholdsService;

@RestController
@RequestMapping("/thresholds")
@AllArgsConstructor
public class ThresholdsController {

    private final ThresholdsService thresholdsService;

    @PutMapping("/{email}")
    ResponseEntity<ThresholdsDTO> update(@PathVariable("email") String email,
                                         @RequestBody ThresholdsDTO data) {
        Thresholds domain = data.toDomain();
        Thresholds thresholds = this.thresholdsService.update(email, domain);
        ThresholdsDTO dto = new ThresholdsDTO(thresholds);
        return ResponseEntity.ok(dto);
    }

}
