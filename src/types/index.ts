export interface Pageables {
  recordsPerPage: number;
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  searchTerm: string | undefined;
  sort: string;
  order: "ASC" | "DESC";
  startDate: string | null;
  endDate: string | null;
}
export interface Headers {
  title: string;
  key: string;
  align: string;
  sortable: boolean;

}
