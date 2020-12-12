<template>
  <Page>
    <ActionBar>
      <GridLayout width="100%" columns="auto, *,auto">
        <Label
          :text="'fa-bars' | fonticon"
          @tap="$refs.drawer.nativeView.showDrawer()"
          col="0"
          class="fa"
          style="font-size: 20pt"
        />
        <Label
          class="title"
          text="AGENDA!"
          col="1"
          horizontalAlignment="center"
        />
        <Label
          class="title"
          text="Today"
          col="2"
          horizontalAlignment="right"
          @tap="goToDate(new Date())"
        />
      </GridLayout>
    </ActionBar>
    <RadSideDrawer ref="drawer">
      <StackLayout ~drawerContent backgroundColor="#ffffff">
        <StackLayout class="drawer-header">
          <Label class="fa">{{ "fa-address-book" | fonticon }} AGENDA</Label>
        </StackLayout>
        <Label class="fa drawer-item item-selected"
          >{{ "fa-calendar" | fonticon }} Calendar</Label
        >
        <Label class="fa drawer-item" @tap="$goTo('Events', false)"
          >{{ "fa-calendar-o" | fonticon }} Events</Label
        >
      </StackLayout>

      <GridLayout ~mainContent rows="auto, *">
        <RadCalendar
          ref="calendar"
          row="1"
          :viewMode="mode"
          :eventSource="getEventsCalendar"
          @dateSelected="onDateSelected"
          :eventsViewMode="eventsViewMode"
          @inlineEventSelected="inlineEventSelected"
          @navigatedToDate="navigatedToDate"
          locale="en_US"
        ></RadCalendar>
        <fab
          row="1"
          rippleColor="#f1f1f1"
          class="fab-button fa"
          @tap="showEventModal"
          >{{ "fa-plus" | fonticon }}</fab
        >
      </GridLayout>
    </RadSideDrawer>
  </Page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CalendarEventsViewMode } from "nativescript-ui-calendar";
import { action } from "@nativescript/core/ui/dialogs";
import Dates from "@/utils/Dates.ts";

@Component({
  components: {},
})
export default class App extends Vue {
  $refs!: {
    list: HTMLFormElement;
    drawer: HTMLFormElement;
    calendar: HTMLFormElement;
  };

  mode: string = "Month";
  eventsViewMode = CalendarEventsViewMode.Inline;
  currentDate = new Date()
  //methods
  setViewMode(mode: string) {
    this.mode = mode;
  }

  mounted() {
    let vm = this;
    this.$store.dispatch("event/loadByDatesForCalendar", {
      date:new Date()
    });
  }

  get getEventsCalendar(): Array<object> {
    return this.$store.getters["event/getEventsCalendar"];
  }

  showEventModal() {
    var vm = this;
    action("Select", "Cancel", ["Task", "Event"]).then((result) => {
      if (result == "Task") {
        vm.$store.dispatch("task/set", null);
        vm.$gotToModal("TaskModal").then(function (data) {
          vm.$refs.calendar.nativeView.clearSelection();
          //vm.goToDate(vm.currentDate)
        });
        
      } else if(result == "Event"){
        vm.$store.dispatch("event/set", null);
        vm.$gotToModal("EventModal").then(function (data) {
          vm.$refs.calendar.nativeView.clearSelection();
          //vm.goToDate(vm.currentDate)
        });
      }
    });
  }

  onDateSelected(eventData) {
    //this.myItems = this.$refs.calendar.nativeView.getEventsForDate(eventData.date);
    //console.log(eventData.date);
  }

  inlineEventSelected(eventData) {
    let vm = this;
    /*
    this.$store
      .dispatch("event/loadByTitleAndDates", eventData.eventData)
      .then(function (data) {
        vm.$store.dispatch("event/set", {
          id: data[0],
          title: data[1],
          description: data[2],
          startDate: data[3],
          startTime: data[4],
          endDate: data[5],
          endTime: data[6],
          reminder: data[7],
          //category: data[7],
          //priority: data[8],
        });
        vm.$gotToModal("EventModal").then(function (data) {});
      });*/
  }

  navigatedToDate(eventData) {
    console.log('navigatedToDate',eventData.date);
    this.currentDate = eventData.date
    this.$store.dispatch("event/load", {
      date:eventData.date
    });
  }

  goToDate(date) {
    this.$refs.calendar.nativeView.goToDate(date);
  }
}
</script>

<style scoped>
</style>
