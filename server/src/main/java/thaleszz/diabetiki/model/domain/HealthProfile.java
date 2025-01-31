package thaleszz.diabetiki.model.domain;

import lombok.Getter;

import java.util.Date;
import java.util.UUID;

public class HealthProfile {
    private UUID uuid;
    @Getter
    private Date date;
    private Float weight;
    private Float height;
}
