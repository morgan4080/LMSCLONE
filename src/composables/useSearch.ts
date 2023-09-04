import { KopeshaPagination } from "@/salesDashboard/composables/collections/useToday";

export const useSearch = (
  pageables: KopeshaPagination,
  callback: () => any
) => {
  async function search() {
    if (pageables.searchTerm?.length === 0) pageables.searchTerm = "";
    if (pageables.startDate?.length === 0) pageables.startDate = "";
    if (pageables.endDate?.length === 0) pageables.endDate = "";
    pageables.draw = 1;
    await callback();
  }
  return { search };
};
