import { defineStore } from "pinia";
import { AxiosResponse, AxiosError } from "axios";

import { client } from "../client/sdk.gen";

type AlertType = "info" | "danger" | "success" | "warning" | "dark";

interface notification {
  id?: number;
  kind?: AlertType;
  status?: number;
  message: string;
}

interface NotifyState {
  alerts: notification[];
}

export const useNotifyStore = defineStore("notify", {
  state: (): NotifyState => ({
    alerts: [],
  }),
  actions: {
    addAlert(error: notification): void {
      const id = Date.now();
      this.alerts.push({ ...error, id });

      let timeout = 3000;

      if (error.kind && error.kind === "danger") {
        timeout = 5000;
      }

      setTimeout(() => {
        this.dropAlert(id);
      }, timeout);
    },
    dropAlert(id: number): void {
      this.alerts = this.alerts.filter((alert) => alert.id !== id);
    },
    clearAlerts() {
      this.alerts = [];
    },
    initialize(): void {
      client.instance.interceptors.response.use(
        (response: AxiosResponse): AxiosResponse => response,
        (error: AxiosError): Promise<never> => {
          if (error.response) {
            let message = "Error occurred";
            const data = error.response.data as notification;

            switch (error.response.status) {
              case 400:
                message = data.message || "Bad request";
                break;
              case 401:
                message = data.message || "Unauthorized";
                break;
              case 404:
                message = data.message || "Not found";
                break;
              case 500:
                message = data.message || "Server error";
                break;
              default:
                message = data.message || "Unexpected error";
            }

            this.addAlert({
              kind: "danger",
              status: error.response.status,
              message,
            });
          } else if (error.request) {
            this.addAlert({
              kind: "danger",
              message: "No response",
            });
          } else {
            this.addAlert({
              kind: "danger",
              message: error.message,
            });
          }

          return Promise.reject(error);
        },
      );
    },
  },
});
