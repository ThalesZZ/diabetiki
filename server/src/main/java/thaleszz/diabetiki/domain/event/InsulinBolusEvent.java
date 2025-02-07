package thaleszz.diabetiki.domain.event;

import java.util.UUID;

public class InsulinBolusEvent extends UserEvent {
    public static final String INSULIN_BOLUS_EVENT_TYPE = "insulin_bolus";

    private UUID userId;
    private int value;

    protected InsulinBolusEvent(UUID uuid, long timestamp) {
        super(uuid, timestamp, INSULIN_BOLUS_EVENT_TYPE);
    }
}
