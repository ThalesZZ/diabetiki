package thaleszz.diabetiki.domain;

import lombok.Data;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Data
public class User {
    private UUID uuid;
    private String name;
    private String email;
    private Thresholds thresholds;
    private List<SensitivityProfile> sensitivityProfiles;
    private List<HealthProfile> healthProfiles;

    public SensitivityProfile getCurrentSensitivityProfile() {
        return this.sensitivityProfiles.stream().max(Comparator.comparing(SensitivityProfile::getDate)).orElseThrow();
    }

    public HealthProfile getCurrentHealthProfile() {
        return this.healthProfiles.stream().max(Comparator.comparing(HealthProfile::getDate)).orElseThrow();
    }

}
