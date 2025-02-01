package thaleszz.diabetiki.domain.event;

import java.util.UUID;

public abstract class UserEvent {
    private final UUID uuid;
    private final long timestamp;
    private final String eventType;

    protected UserEvent(UUID uuid, long timestamp, String eventType) {
        this.uuid = uuid;
        this.timestamp = timestamp;
        this.eventType = eventType;
    }
}
