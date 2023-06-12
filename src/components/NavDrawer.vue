<template>
  <v-navigation-drawer
    style="background-color: hsla(210, 33%, 25%, 1)"
    class="text-white"
    v-model="drawer"
    location="left"
    width="230"
    permanent
  >
    <v-col>
      <v-img
        width="150"
        src="@/assets/presta-white-logo-full.png"
      />
    </v-col>
    <v-col>
      <v-row
        no-gutters
        align="center"
        justify="space-between"
        class="pr-8"
      >
        <v-avatar
          size="55"
          image="@/assets/user.png"
          style="border: 5px solid white"
        ></v-avatar>
        <div>
          <div class="text-caption text-grey-lighten-1">Welcome,</div>
          <div class="text-subtitle-2 font-weight-light text-white">
            {{
              authStore.getLoggedInUser
                ? `${authStore.getLoggedInUser.firstName} ${authStore.getLoggedInUser.lastName}`
                : "loading.."
            }}
          </div>
        </div>
      </v-row>
    </v-col>

    <v-list
      :lines="false"
      nav
    >
      <template
        v-for="(item, i) in items"
        :key="i"
      >
        <v-list-group
          v-if="item.subItems.length > 0"
          :value="item"
          active-color="primary"
          expand-icon="mdi:mdi-chevron-down"
          collapse-icon="mdi:mdi-chevron-up"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              lines="one"
              :title="item.text"
            >
              <template v-slot:prepend>
                <v-icon
                  class="ml-0"
                  :icon="item.icon"
                ></v-icon>
              </template>
            </v-list-item>
          </template>

          <div class="py-1" />

          <v-list-item
            v-for="(it, i) in item.subItems"
            :key="i"
            :value="it"
            active-color="primary"
            class="subItems"
            :href="it.href"
          >
            <v-list-item-title>{{ it.text }}</v-list-item-title>
          </v-list-item>

          <div class="py-1" />
        </v-list-group>

        <v-list-item
          v-else
          :key="i"
          :value="item"
          active-color="primary"
          :href="item.href"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar prominent>
    <v-toolbar
      flat
      density="default"
      content=""
    >
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
        style="color: #337ab7"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            class="text-medium-emphasis v-btn--size-default text-body-2 px-3 text-capitalize"
            density="default"
            prepend-icon="mdi:mdi-account-circle-outline"
            append-icon="mdi:mdi-chevron-down"
            v-bind="props"
          >
            {{
              authStore.getLoggedInUser
                ? authStore.getLoggedInUser.companyName
                : "loading ..."
            }}
          </v-btn>
        </template>
        <v-sheet
          border
          rounded
        >
          <v-list
            nav
            density="compact"
            role="listbox"
          >
            <v-list-item
              link
              href="https://accounts.presta.co.ke/"
              density="compact"
            >
              <template v-slot:prepend>
                <v-icon icon="mdi:mdi-plus"></v-icon>
              </template>
              <v-list-item-title>Create Organisation</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-menu>

      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            class="text-medium-emphasis v-btn--size-default text-body-2 px-3 text-capitalize"
            density="default"
            prepend-icon="mdi:mdi-account-circle-outline"
            append-icon="mdi:mdi-chevron-down"
            v-bind="props"
          >
            {{
              authStore.getLoggedInUser
                ? `${authStore.getLoggedInUser.firstName} ${authStore.getLoggedInUser.lastName}`
                : "loading.."
            }}
          </v-btn>
        </template>
        <v-sheet
          border
          rounded
        >
          <v-list
            nav
            density="compact"
            role="listbox"
          >
            <v-list-subheader
              title="ACCOUNT"
              class="text-high-emphasis text-uppercase font-weight-black"
            />
            <v-list-item
              link
              href="https://accounts.presta.co.ke/"
              title="Approval Requests"
              density="compact"
            >
            </v-list-item>
            <v-list-item
              link
              href="https://accounts.presta.co.ke/"
              title="Profile"
              density="compact"
            >
            </v-list-item>
            <v-list-item
              link
              href="https://accounts.presta.co.ke/"
              :title="
                authStore.getLoggedInUser
                  ? `Account No. ${authStore.getLoggedInUser.tenantId}`
                  : 'loading..'
              "
              density="compact"
            >
            </v-list-item>
            <v-list-item
              link
              href="https://accounts.presta.co.ke/"
              title="Version (Staging)"
              density="compact"
            >
            </v-list-item>

            <v-divider class="my-3 mb-4" />

            <v-list-item
              link
              href="https://accounts.presta.co.ke/"
              density="compact"
            >
              <template v-slot:append>
                <v-icon icon="mdi:mdi-logout-variant"></v-icon>
              </template>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-menu>

      <v-menu>
        <template v-slot:activator="{ props: menu }">
          <v-tooltip location="bottom">
            <template v-slot:activator="{ props: tooltip }">
              <v-btn
                icon="mdi:mdi-dots-grid"
                v-bind="mergeProps(menu, tooltip)"
              >
                <v-icon />
              </v-btn>
            </template>
            <span>Presta Applications</span>
          </v-tooltip>
        </template>
        <v-sheet
          border
          rounded
        >
          <v-list
            nav
            density="compact"
            role="listbox"
          >
            <v-list-subheader
              title="Presta Applications"
              class="text-high-emphasis text-uppercase font-weight-black"
            />

            <v-list-item
              link
              href="https://accounts.presta.co.ke/"
              title="Account Home"
              density="compact"
            >
              <template v-slot:append>
                <v-icon icon="mdi:mdi-account-arrow-left"></v-icon>
              </template>
            </v-list-item>

            <v-list-item
              link
              href="https://accounts.presta.co.ke/"
              title="Presta Pay"
              density="compact"
            >
              <template v-slot:append>
                <v-icon icon="mdi:mdi-cash-sync"></v-icon>
              </template>
            </v-list-item>

            <v-list-item
              link
              href="https://accounts.presta.co.ke/"
              title="Appraisal"
              density="compact"
            >
              <template v-slot:append>
                <v-icon icon="mdi:mdi-text-box-check"></v-icon>
              </template>
            </v-list-item>

            <v-list-item
              link
              href="https://accounts.presta.co.ke/"
              title="Calculator"
              density="compact"
            >
              <template v-slot:append>
                <v-icon icon="mdi:mdi-calculator"></v-icon>
              </template>
            </v-list-item>

            <v-list-item
              link
              href="https://accounts.presta.co.ke/"
              title="IAM"
              density="compact"
            >
              <template v-slot:append>
                <v-icon icon="mdi:mdi-account-cog"></v-icon>
              </template>
            </v-list-item>

            <v-list-item
              link
              href="https://accounts.presta.co.ke/"
              title="Analytics"
              density="compact"
            >
              <template v-slot:append>
                <v-icon icon="mdi:mdi-chart-bar-stacked"></v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-menu>
    </v-toolbar>
  </v-app-bar>

  <v-overlay
    v-model="authStore.getAuthPrompt"
    contained
    class="pt-16 align-start justify-center"
    scroll-strategy="block"
  >
    <v-card
      class="pa-2 mt-8"
      style="width: 66.6vh"
    >
      <v-card-title class="text-subtitle-2"
        >Please Login To Continue</v-card-title
      >
      <v-card-text>
        <v-divider></v-divider>
        <v-img
          class="pa-12 mx-auto"
          width="150"
          src="@/assets/presta_logo.png"
        />
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          @click="redirectAuth"
          class="bg-green-lighten-1 w-100"
          >Click here to login</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script lang="ts" setup>
import { mergeProps, ref } from "vue";

import { useBreakpoints } from "@vueuse/core";
import stores from "../store";
import { fa } from "vuetify/iconsets/fa4";

const authStore = stores.authStore;

const breakpoints = useBreakpoints({
  mobile: 320,
  tablet: 600,
  laptop: 960,
  desktop: 1280,
  large_desktop: 1920,
  extra_large_desktop: 2560,
});

const mobile = breakpoints.between("mobile", "tablet");

const drawer = ref(!mobile.value);

const items = ref<
  {
    text: string;
    href: string;
    icon: string;
    subItems: { text: string; href: string }[];
  }[]
>([
  {
    text: "Home",
    icon: "fa fa-home",
    href: "#",
    subItems: [
      {
        text: "Ops Dashboard",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/dashboard/operations",
      },
      {
        text: "Income Dashboard",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/dashboard/income_analysis",
      },
      {
        text: "Collections Dashboard",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/dashboard/collections_analysis",
      },
      {
        text: "Accounts Analysis",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/dashboard/accounts-analysis",
      },
    ],
  },
  {
    text: "Loans",
    icon: "fa fa-bank",
    href: "fa fa-home",
    subItems: [
      {
        text: "All Loans",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/loans/loans_listings",
      },
      {
        text: "Due Loans",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/loans/due_loans",
      },
      {
        text: "Collections",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/loans/collectionsbreakdown",
      },
      {
        text: "Tracker",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/loans/tracker",
      },
      {
        text: "Arrears Report",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/loans/loan-arrears",
      },
      {
        text: "Current Balances",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/loans/loan-balances",
      },
      {
        text: "Loan Payments",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/transactions/payments",
      },
    ],
  },
  {
    text: "Transactions",
    icon: "fa fa-credit-card",
    href: "#",
    subItems: [
      {
        text: "C2B (In)",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/transactions/receipts",
      },
      {
        text: "B2C (Out)",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/transactions/disbursements",
      },
      {
        text: "Checkoff",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/transactions/checkoffs",
      },
      {
        text: "Import Balances",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/transactions/member-balances",
      },
      {
        text: "Manual Journal",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/transactions/journal",
      },
    ],
  },
  {
    text: "Customer",
    icon: "fa fa-users",
    href: "#",
    subItems: [
      {
        text: "Customers",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/customers/customer_listing",
      },
      {
        text: "New Applications",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/customers/customer_applications",
      },
      {
        text: "Customer Groups",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/customers/customercategories",
      },
      {
        text: "Member Savings",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/investment/contributions",
      },
      {
        text: "Member Settings",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/customers/membership_settings",
      },
      {
        text: "Sales Representatives",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/customers/sales_representatives",
      },
      {
        text: "Scoring",
        href: "scoring",
      },
    ],
  },
  {
    text: "Setup",
    icon: "fa fa-cogs",
    href: "#",
    subItems: [
      {
        text: "App Settings",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/setup/lender_setup",
      },
      {
        text: "Loan Products",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/setup/loan_products",
      },
      {
        text: "Loan Fees",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/setup/loan_fees",
      },
      {
        text: "System Fees",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/setup/lender_fees",
      },
      {
        text: "Penalty Setup",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/setup/penalty_setup",
      },
      {
        text: "GL Setup",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/setup/gl_setup",
      },
      {
        text: "Journal Templates",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/setup/ledgertemplates",
      },
      {
        text: "KYC Settings",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/setup/kyc_settings",
      },
      {
        text: "Utility Accounts",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/setup/utilityaccounts",
      },
      {
        text: "Branches",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/setup/branches",
      },
      {
        text: "Regions",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/setup/regions",
      },
      {
        text: "SMS Templates",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/setup/sms_templates",
      },
      {
        text: "Metadata",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/setup/metadata",
      },
    ],
  },
  {
    text: "Reports",
    icon: "fa fa-bar-chart-o",
    href: "https://lending.presta.co.ke/kopesha/lender/index.html#/reports/all-reports",
    subItems: [],
  },
  {
    text: "Investments",
    icon: "fa fa-briefcase",
    href: "#",
    subItems: [
      {
        text: "Beneficiaries",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/investment/beneficiaries",
      },
      {
        text: "Transfer Money",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/investment/transfers",
      },
      {
        text: "Investment Methods",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/investment/investment_methods",
      },
      {
        text: "Investments",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/investment/investment_listing",
      },
      {
        text: "Withdraw",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/investment/withdrawal",
      },
      {
        text: "Lock Capital",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/investment/capital",
      },
    ],
  },
  {
    text: "Billing",
    icon: "fa fa-shopping-cart",
    href: "fa fa-home",
    subItems: [
      {
        text: "Payment History",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/billing/payment_history",
      },
      {
        text: "About",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/billing/about",
      },
      {
        text: "Settings",
        href: "https://lending.presta.co.ke/kopesha/lender/index.html#/billing/account-settings",
      },
    ],
  },
]);

const redirectAuth = () => {
  authStore.setAuthPrompt(false);
  /*const currentUrl = window.location.href;
  window.location.href = `${
    import.meta.env.VITE_APP_ROOT
  }?redirect_url=${currentUrl}`;*/
};
</script>

<style scoped>
.subItems:before {
  background: #425668;
  bottom: auto;
  content: "";
  height: 8px;
  left: 15px;
  margin-top: 0;
  position: absolute;
  right: auto;
  width: 8px;
  z-index: 1;
  border-radius: 50%;
}

.subItems:after {
  border-left: 1px solid #425668;
  bottom: 0;
  content: "";
  left: 19px;
  height: 36px;
  position: absolute;
  top: 0;
}
</style>
