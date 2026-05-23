export interface Notifiable {
  asText(): string;
}

export interface Notifier {
  notify(notifiable: Notifiable): Promise<void>;
}
