<script setup lang="ts">
const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
</script>

<template>
  <v-container>
      <v-card
        variant="flat"
        color="white"
        class="rounded h-100"
      >
        <div class="mx-4">
          <v-container
            fluid
            class="mx-auto"
          >
            <div>
              <h1 class="text-h6 font-weight-regular">Monthly Breakdown</h1>
              <h2
                class="text-caption text-grey-darken-2 font-weight-regular"
              >
                Summary Of Upcoming Collections
              </h2>
            </div>

            <div class="my-10">
              <div class="d-flex justify-space-between">
              <div>
                <v-menu transition="slide-y-transition">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="outlined"
                      append-icon="mdi:mdi-chevron-down"
                      v-bind="props"
                      class="text-none text-caption ml-2"
                      style="border: 1px solid rgba(128, 128, 128, 0.25)"
                    >
                      Upcoming Loans
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
                        v-for="(item, idx) in options"
                        :key="idx"
                        :value="item"
                      >{{ item }}</v-list-item
                      >
                    </v-list>
                  </v-sheet>
                </v-menu>
                <v-menu transition="slide-y-transition">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="outlined"
                      append-icon="mdi:mdi-chevron-down"
                      v-bind="props"
                      class="text-none text-caption ml-2"
                      style="border: 1px solid rgba(128, 128, 128, 0.25)"
                    >
                      Select Product
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
                        v-for="(item, idx) in options"
                        :key="idx"
                        :value="item"
                      >{{ item }}</v-list-item
                      >
                    </v-list>
                  </v-sheet>
                </v-menu>
                <v-menu transition="slide-y-transition">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="outlined"
                      append-icon="mdi:mdi-chevron-down"
                      v-bind="props"
                      class="text-none text-caption ml-2"
                      style="border: 1px solid rgba(128, 128, 128, 0.25)"
                    >
                      Select Status
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
                        v-for="(item, idx) in options"
                        :key="idx"
                        :value="item"
                      >{{ item }}</v-list-item
                      >
                    </v-list>
                  </v-sheet>
                </v-menu>
              </div>
                <div>
                  <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="outlined"
                        append-icon="mdi:mdi-chevron-down"
                        v-bind="props"
                        class="text-none text-caption ml-2"
                        style="border: 1px solid rgba(128, 128, 128, 0.25)"
                      >
                        Export
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
                          v-for="(item, idx) in options"
                          :key="idx"
                          :value="item"
                        >{{ item }}</v-list-item
                        >
                      </v-list>
                    </v-sheet>
                  </v-menu>
                  <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="outlined"
                        append-icon="mdi:mdi-chevron-down"
                        v-bind="props"
                        class="text-none text-caption ml-2"
                        style="border: 1px solid rgba(128, 128, 128, 0.25)"
                      >
                        Show / Hide
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
                          v-for="(item, idx) in options"
                          :key="idx"
                          :value="item"
                        >{{ item }}</v-list-item
                        >
                      </v-list>
                    </v-sheet>
                  </v-menu>
                  <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="outlined"
                        append-icon="mdi:mdi-chevron-down"
                        v-bind="props"
                        class="text-none text-caption ml-2"
                        style="border: 1px solid rgba(128, 128, 128, 0.25)"
                      >
                        This Week
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
                          v-for="(item, idx) in options"
                          :key="idx"
                          :value="item"
                        >{{ item }}</v-list-item
                        >
                      </v-list>
                    </v-sheet>
                  </v-menu>
                  <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="outlined"
                        append-icon="mdi:mdi-chevron-down"
                        v-bind="props"
                        class="text-none text-caption ml-2"
                        style="border: 1px solid rgba(128, 128, 128, 0.25)"
                      >
                       <v-icon icon="mdi:mdi-dots-vertical" />
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
                          v-for="(item, idx) in options"
                          :key="idx"
                          :value="item"
                        >{{ item }}</v-list-item
                        >
                      </v-list>
                    </v-sheet>
                  </v-menu>
                </div>
              </div>
            </div>

            <div>
            </div>
          </v-container>
        </div>
      </v-card>
  </v-container>
</template>
