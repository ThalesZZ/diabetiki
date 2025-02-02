package thaleszz.diabetiki.domain;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class HealthProfile {
    private UUID uuid;
    private Date date;
    private Float weight;
    private Float height;
}
