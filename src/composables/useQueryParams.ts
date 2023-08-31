import { ref } from "vue";

export const useQueryParams = (pageables: any) => {
  const params = ref("");

  async function generateParams() {
    const queryParams = new URLSearchParams();
    if (pageables.salesRepRefIds && pageables.salesRepRefIds !== "")
      queryParams.set("salesRepRefIds", pageables.salesRepRefIds);
    if (pageables.searchTerm && pageables.searchTerm !== "")
      queryParams.set("searchTerm", pageables.searchTerm);
    if (pageables.productName && pageables.productName !== "")
      queryParams.set("productName", pageables.productName);
    if (pageables.repaymentStatus && pageables.repaymentStatus !== "")
      queryParams.set("repaymentStatus", pageables.repaymentStatus);
    if (pageables.startDate && pageables.startDate !== "")
      queryParams.set("startDate", pageables.startDate);
    if (pageables.endDate && pageables.endDate !== "")
      queryParams.set("endDate", pageables.endDate);
    queryParams.set("draw", pageables.draw);
    queryParams.set("start", pageables.start);
    queryParams.set("length", pageables.length);
    params.value = queryParams.toString();
    return queryParams;
  }

  return { params, generateParams };
};
