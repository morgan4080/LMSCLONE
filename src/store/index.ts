// Utilities
import { createPinia } from "pinia";
import { useAuthStore } from "@/store/auth-store";
import { useScoringStore } from "@/store/scoring";
import { useSalesDashboardStore } from "@/store/sales-dashboard";

export const pinia = createPinia();

export default {
  authStore: useAuthStore(pinia),
  scoringStore: useScoringStore(pinia),
  salesStore: useSalesDashboardStore(pinia),
};
