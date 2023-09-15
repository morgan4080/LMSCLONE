export interface SalesDashboardState {
  branchIds: string[] | null;
  salesRepIds: string[] | null;
  branches: Branch[];
  salesReps: SalesRep[];
  stats: {
    startDate: string | null;
    endDate: string | null;
    upcomingCollections: string;
    overdueCollectionsPercent: string;
    overdueCollections: string;
    upcomingCollectionsCount: string;
    overdueCollectionsCount: string;
    customersCount: string;
    customersCountIncrement: string;
  };
  upcomingCollections: { data: UpcomingCollection | [] } & Pagination;
  overdueCollections: { data: OverdueCollection | [] } & Pagination;
  newCustomers: { data: Customer | [] } & Pagination;
}

export interface Branch {
  name: string;
}

export interface SalesRep {
  enableAccess: number;
  branchName: string;
  firstName: string;
  fullName: string;
  isLoginUser: number;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  refId: string;
  loansCount: number;
  valueInLoans: number;
  customersCount: number;
}

export interface UpcomingCollection {
  refId: string;
  loanNo: number;
  productName: string;
  branchName: string;
  customerName: string;
  phoneNumber: string;
  dueDate: string;
  amountDue: number;
  daysDue: number;
  amountPaid: number;
  loanBalance: number;
  status: string;
}

export interface OverdueCollection {
  dueDate: string;
  customerName: string;
  productName: string;
  phoneNumber: string;
  loanNo: number;
  refId: string;
  paidAmount: number;
  amountDue: number;
  loanBalance: number;
  status: string;
  daysOverdue: number;
}

export interface Customer {
  refId: string;
  created: string;
  fullName: string;
  phoneNumber: string;
  approvalLimit: number;
  activeLoan: number;
  onboardingStatus: "Approved" | "Declined";
  hasUssd: "YES" | "NO";
  dayJoined: string;
  keycloakId: string;
}

export interface Pagination {
  loading: boolean;
  draw: number;
  start: number;
  length: number;
  recordsFiltered: number;
  recordsTotal: number;
}
