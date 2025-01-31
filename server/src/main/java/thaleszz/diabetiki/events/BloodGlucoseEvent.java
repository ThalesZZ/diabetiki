package thaleszz.diabetiki.events;

import java.util.UUID;

public class BloodGlucoseEvent extends UserEvent {
    public static final String BLOOD_GLUCOSE_EVENT_TYPE = "blood_glucose";

    private UUID userId;
    private int value;

    public BloodGlucoseEvent(UUID uuid, long timestamp) {
        super(uuid, timestamp, BLOOD_GLUCOSE_EVENT_TYPE);
    }
}
