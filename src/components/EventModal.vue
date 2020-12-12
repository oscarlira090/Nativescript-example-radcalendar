<template>
  <Page>
    <GridLayout rows="auto,auto,*">
      <GridLayout row="0" col="0" columns="auto,*,*" class="modal-header">
        <Label
          class="fa"
          :text="'fa-arrow-left' | fonticon"
          horizontalAlignment="left"
          col="0"
          backgroundColor="#0000"
          style="padding-right: 10"
          @tap="cancel"
        />
        <Label
          :text="titleModal"
          horizontalAlignment="center"
          col="1"
          backgroundColor="#0000"
        />
        <Label
          text="Ok"
          horizontalAlignment="right"
          backgroundColor="#0000"
          col="2"
          style="padding-left: 10; margin-right: 5"
          @tap="save"
        />
      </GridLayout>
      <Button
        @tap="delete_"
        class="fa btn btn-cancel"
        row="1"
        col="0"
        height="40"
        width="20%"
        horizontalAlignment="left"
        :visibility="event.id == 0 ? 'collapse' : 'visible'"
        >{{ "fa-trash-o" | fonticon }} Delete</Button
      >
      <RadDataForm
        ref="dataForm"
        :source="event"
        :metadata="eventMetaData"
        :groups="groups"
        @propertyCommitted="propertyCommitted"
        row="2"
        col="0"
      >
      </RadDataForm>
    </GridLayout>
  </Page>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import EventModal from "@/components/EventModal.vue";
import EventMetaData from "@/components/models/EventMetaData.ts";
import Event from "@/components/models/Event.ts";
import { confirm } from "@nativescript/core/ui/dialogs";
import Dates from "@/utils/Dates.ts";
import { DataFormFontStyle } from "nativescript-ui-dataform";
import * as Toast from "nativescript-toast";
import Notification from "@/utils/Notification.ts";

const eventMetaData = new EventMetaData();

@Component
export default class App extends Vue {
  $refs!: {
    dataForm: HTMLFormElement;
  };

  event = new Event();
  wreminder = ''
  eventMetaData = eventMetaData;
  groups = eventMetaData.getGroups();
  titleModal = "Add Event";
  mounted() {
    let getevent = this.$store.getters["event/getEvent"];
    if (getevent != null) {
      this.wreminder = getevent.reminder
      this.event = getevent;
      this.titleModal = "Edit Event";
    }
  }
  get getEvent(): object {
    return this.event;
  }

  delete_() {
    let vm = this;
    confirm("Delete?").then((result) => {
      if (result) {
        if (this.event.id != 0) {
          vm.$store.dispatch("event/delete_", vm.event).then(function (data) {
            console.log("event deleted Successfully");
            Toast.makeText("Deleted Successfully", "long").show();
            Notification.cancelNotification(vm.event.id);
            vm.$closeModal(vm);
          });
        }
      }
    });
  }

  save() {
    var vm = this;
    let form = this.$refs.dataForm.nativeView;

    form.validateAll().then((result) => {
      let startDate = form.getPropertyByName("startDate");
      let startTime = form.getPropertyByName("startTime");
      let endDate = form.getPropertyByName("endDate");
      let endTime = form.getPropertyByName("endTime");

      let resVal = Dates.isDateLessOrSameThan(
        Dates.stringToDateTime(
          startDate.valueCandidate,
          startTime.valueCandidate
        ),
        Dates.stringToDateTime(endDate.valueCandidate, endTime.valueCandidate)
      );
      if (!resVal) {
        endDate.errorMessage = "Should be greater or equal to Start Date.";
        form.notifyValidated("endDate", false);
      }
      if (result && resVal) {
        form.notifyValidated("endDate", true);

        if (vm.event.id == 0) {
          //if(vm.event.reminder == )
          
          vm.$store.dispatch("event/save", vm.event).then(function (id) {
            console.log("event created Successfully");
            Toast.makeText("Created Successfully", "long").show();
            Notification.addNotification(vm.event, id, 1);
            vm.$closeModal(vm);
          });
        } else {          
          vm.$store.dispatch("event/update", vm.event).then(function (data) {
            console.log("event updates Successfully");
            Toast.makeText("Updated Successfully", "long").show();
            if(vm.wreminder != vm.event.reminder){
              Notification.cancelNotification(vm.event.scheduleid1)
            }
            Notification.addNotification(vm.event, vm.event.id, 1);
            vm.$closeModal(vm);
          });
        }
      }
    });
  }

  cancel() {
    this.$closeModal(this);
  }

  propertyCommitted(args) {
    let form = this.$refs.dataForm.nativeView;
    let isAllDay = form.getPropertyByName("isAllDay").value;
    console.log(isAllDay, "is");
    if (args.propertyName == "isAllDay" && isAllDay) {
      /*
      let endDate = form.getPropertyByName("endDate").valueCandidate = form.getPropertyByName("startDate").valueCandidate
      let startTime = form.getPropertyByName("startTime").valueCandidate = "12:00";
      let endTime = form.getPropertyByName("endTime").valueCandidate = "23:59";*/
      this.event.startTime = "12:00";
      this.event.endTime = "23:59";
      this.event.endDate = this.event.startDate;
      form.source = null;
      form.reload();
      form.source = this.event;
    }
  }
}
</script>

<style scoped>
</style>
