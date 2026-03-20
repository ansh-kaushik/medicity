export const requestPermission = async () => {
  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }
};

export const notify = (title: string, body?: string) => {
  if (Notification.permission === "granted") {
    new Notification(title, { body, icon: "/favicon.svg" });
  }
};
