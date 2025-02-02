package thaleszz.diabetiki.domain;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class SensitivityProfile {
    private UUID uuid;
    private Date date;
    private int targetBloodGlucose;
    private float bloodGlucoseSensitivity;
    private float carbohydrateSensitivity;

    public float calculateInsulinBolus(int currentBloodGlucose, float carbohydrates) {
        float bolusForBloodGlucose = (currentBloodGlucose - this.targetBloodGlucose) / this.bloodGlucoseSensitivity;
        float bolusForFood = carbohydrates / this.carbohydrateSensitivity;
        return bolusForBloodGlucose + bolusForFood;
    }
}