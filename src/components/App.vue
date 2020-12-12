<template>
  <Page>
    <ActionBar>
      <GridLayout width="100%" columns="auto,*,*">
        <Label
          :text="'fa-bars' | fonticon"
          @tap="$refs.drawer.nativeView.showDrawer()"
          col="0"
          class="fa title"
          style="font-size: 20pt"
        />
        <Label
          text="AGENDA"
          horizontalAlignment="center"
          col="1"
          backgroundColor="#0000"
          class="title"
        />
        <Label
          text="FILTER"
          horizontalAlignment="right"
          backgroundColor="#0000"
          col="2"
          class="title"
          style="padding-left: 10; margin-right: 5"
        />
      </GridLayout>
    </ActionBar>
    <RadSideDrawer ref="drawer">
      <StackLayout ~drawerContent backgroundColor="#ffffff">
        <StackLayout class="drawer-header">
          <Label text="oscar lira" />
        </StackLayout>
        <Label class="fa drawer-item" @tap="$goTo('Home', false)"
          >{{ "fa-calendar" | fonticon }} Calendar</Label
        >
        <Label class="fa drawer-item item-selected"
          >{{ "fa-calendar-o" | fonticon }} Events</Label
        >
      </StackLayout>

      <GridLayout ~mainContent rows="auto, *">
        <TabView row="1" tabBackgroundColor="#f7f5fb" tabTextColor="#000" selectedTabTextColor="#30bcff">
          <TabViewItem title="Events">
            <GridLayout rows="*,auto" columns="*,auto">
              <label text='No Upcoming Events' colSpan="2" row="1" :visibility="getEvents.length == 0 ? 'visible' : 'collapse'" class="font-weight-bold text-danger h3 m-10" />
              <RadListView
                colSpan="2"
                row="1"
                ref="list"
                for="item in getEvents"
                @itemTap="itemEventTap($event)"
                :groupingFunction="groupByDate"
              >
                <v-template name="group">
                  <StackLayout class="item" orientation="vertical">
                    <Label :text="item.category | date" class="category" />
                  </StackLayout>
                </v-template>
                <v-template>
                  <GridLayout class="item" columns="auto,*">
                    <StackLayout
                      col="0"
                      class="item"
                      orientation="vertical"
                      style="time"
                    >
                      <Label :text="item.startTime | time" class="time"></Label>
                      <Label :text="item.endTime | time" class="time"></Label>
                    </StackLayout>

                    <Label
                      :text="item.title"
                      col="1"
                      class="description"
                    ></Label>
                  </GridLayout>
                </v-template>
              </RadListView>
              <fab
                col="0"
                row="1"
                rippleColor="#f1f1f1"
                class="fab-button-sm fa"
                horizontalAlignment="right"
                @tap="$gotToModal('Calendar')"
                >{{ "fa-calendar" | fonticon }}</fab
              >
              <fab
                col="1"
                row="1"
                rippleColor="#f1f1f1"
                class="fab-button fa"
                @tap="showEventModal"
                horizontalAlignment="right"
                >{{ "fa-plus" | fonticon }}</fab
              >
            </GridLayout>
          </TabViewItem>
          <TabViewItem title="Tasks">
            <GridLayout rows="*,auto" columns="*,auto">
                            <label text='No Tasks For Today' colSpan="2" row="1" :visibility="getTasks.length == 0 ? 'visible' : 'collapse'" class="font-weight-bold text-danger h3 m-10" />

              <RadListView
                colSpan="2"
                row="1"
                ref="list"
                for="item in getTasks"
                @itemTap="itemTaskTap($event)"
                :groupingFunction="groupByDate"
              >
                <v-template name="group">
                  <StackLayout class="item" orientation="vertical">
                    <Label :text="item.category | date" class="category" />
                  </StackLayout>
                </v-template>
                <v-template>
                  <GridLayout class="item" columns="95,*">
                    <StackLayout
                      col="0"
                      class="item"
                      orientation="vertical"
                    >
                      <Label :text="item.startTime | time" class="time"></Label>
                      <Label :text="item.endTime | time" class="time"></Label>
                    </StackLayout>

                    <StackLayout
                       col="1"
                       orientation="horizontal"
                       class="description"
                       height="50"
                    >

                    <Label
                      :class="{fa:true,'color-done': (item.done==1)}"
                    >{{ "fa-check-circle-o" | fonticon }}</Label>

                      <Label
                      :text="item.title"
                    ></Label>
                    </StackLayout>

                    
                  </GridLayout>
                </v-template>
              </RadListView>
              <fab
                col="0"
                row="1"
                rippleColor="#f1f1f1"
                class="fab-button-sm fa"
                horizontalAlignment="right"
                @tap="$gotToModal('Calendar')"
                >{{ "fa-calendar" | fonticon }}</fab
              >
              <fab
                col="1"
                row="1"
                rippleColor="#f1f1f1"
                class="fab-button fa"
                @tap="showTaskModal"
                horizontalAlignment="right"
                >{{ "fa-plus" | fonticon }}</fab
              >
            </GridLayout>
          </TabViewItem>
        </TabView>
      </GridLayout>
    </RadSideDrawer>
  </Page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CalendarEventsViewMode } from "nativescript-ui-calendar";
import Event from "./models/Event";
import Dates from "@/utils/Dates.ts";

@Component({
  components: {},
  filters: {
    date(date: any) {
      return Dates.formatfullDate(Dates.stringToDate(date), "EN");
    },

    time(time: any) {
      return Dates.format24to12hour(time);
    },
  },
})
export default class App extends Vue {
  $refs!: {
    list: HTMLFormElement;
    drawer: HTMLFormElement;
  };


 

  //methods

  mounted() {
    let vm = this;
    this.$store.dispatch("event/load", []);
    this.$store.dispatch("task/load", []);
  }

  get getEvents(): Array<object> {
    return this.$store.getters["event/getEvents"];
  }

  get getTasks(): Array<object> {
    return this.$store.getters["task/getTasks"];
  }

  showEventModal() {
    var vm = this;
    this.$store.dispatch("event/set", null);
    this.$gotToModal("EventModal").then(function (data) {});
  }

  showTaskModal() {
    var vm = this;
    this.$store.dispatch("task/set", null);
    this.$gotToModal("TaskModal").then(function (data) {});
  }

  itemEventTap(event) {
    var vm = this;
    console.log(event.item);
    this.$store.dispatch("event/set", event.item);
    this.$gotToModal("EventModal").then(function (data) {});
  }

  itemTaskTap(event) {
    var vm = this;
    console.log(event.item);
    this.$store.dispatch("task/set", event.item);
    this.$gotToModal("TaskModal").then(function (data) {});
  }

  groupByDate(item) {
    return item.startDate;
  }
}
</script>

<style scoped>
</style>
