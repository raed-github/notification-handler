import { NotificationHandler, EventHandler } from "./notification-handler";

class MyEventHandler implements EventHandler {
  handleEvent(event: any): void {
    console.log(`Received event: ${JSON.stringify(event)}`);
    console.log('Do something with the event data')
  }
}

const eventType = "userLoggedIn";
const eventHandler = new MyEventHandler();

const notificationHandler = new NotificationHandler(eventType, eventHandler);
notificationHandler.start();

// Call notificationHandler.stop() when you're done receiving events