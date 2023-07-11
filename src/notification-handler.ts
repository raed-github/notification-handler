import EventSource = require('eventsource');

export interface EventHandler {
  handleEvent: (event: any) => void;
}

export class NotificationHandler {
  private eventSource: EventSource | null = null;

  constructor(private readonly eventType: string, private readonly handler: EventHandler) {}

  start(): void {
    this.eventSource = new EventSource(`/events/${this.eventType}`);

    this.eventSource.addEventListener("message", (event) => {
      const eventData = JSON.parse(event.data);
      this.handler.handleEvent(eventData);
    });

    this.eventSource.addEventListener("error", (event) => {
      console.log(`Event source error: ${event}`);
    });
  }

  stop(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}