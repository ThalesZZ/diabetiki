package thaleszz.diabetiki.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class HealthProfile {
    private final UUID uuid;
    private Date date;
    private Float weight;
    private Float height;
}
