package thaleszz.diabetiki.domain;

import lombok.AllArgsConstructor;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
public class User {
    private final UUID uuid;
    private final String name;
    private final String email;
    private final Thresholds thresholds;
    private final List<SensitivityProfile> sensitivityProfiles;
    private final List<HealthProfile> healthProfiles;

    public SensitivityProfile getCurrentSensitivityProfile() {
        return this.sensitivityProfiles.stream().max(Comparator.comparing(SensitivityProfile::getDate)).orElseThrow();
    }

    public HealthProfile getCurrentHealthProfile() {
        return this.healthProfiles.stream().max(Comparator.comparing(HealthProfile::getDate)).orElseThrow();
    }

}
