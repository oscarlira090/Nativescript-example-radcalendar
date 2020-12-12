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
      <StackLayout row="1" col="0" orientation="horizontal"> 
        
        <Button
        @tap="delete_"
        class="fa btn btn-cancel"
        row="1"
        col="0"
        height="40"
        width="20%"
        :visibility="task.id == 0 ? 'collapse' : 'visible'"
        >{{ "fa-trash-o" | fonticon }} Delete</Button
      >
      <Label
          backgroundColor="#0000"
          col="2"
          @tap="finish"
          :class="doneCSS"
          style="font-size:15"
          :visibility="task.id == 0 ? 'collapse' : 'visible'"
        >{{ "fa-check" | fonticon }} DONE</Label>
      <Switch checked="false" v-model="done" @tap="finish" :visibility="task.id == 0 ? 'collapse' : 'visible'"/>

      </StackLayout>
      
      <RadDataForm
        ref="dataForm"
        :source="task"
        :metadata="taskMetaData"
        :groups="groups"
        row="2"
        col="0"
      >
      </RadDataForm>
    </GridLayout>
  </Page>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TaskMetaData from "@/components/models/TaskMetaData.ts";
import Task from "@/components/models/Task.ts";
import { confirm } from "@nativescript/core/ui/dialogs";
import Dates from "@/utils/Dates.ts";
import { DataFormFontStyle } from "nativescript-ui-dataform";
import * as Toast from "nativescript-toast";
import Notification from "@/utils/Notification.ts";

const taskMetaData = new TaskMetaData();

@Component
export default class App extends Vue {
  $refs!: {
    dataForm: HTMLFormElement;
  };

  task = new Task();
  taskMetaData = taskMetaData;
  groups = taskMetaData.getGroups();
  titleModal = "Add Task";
  wreminder = ''
  wreminder2=''
  done=false

  mounted() {
    let gettask = this.$store.getters["task/getTask"];
    if (gettask != null) {
      this.wreminder = gettask.reminder
      this.wreminder2 = gettask.reminder2
      this.done = gettask.done ==1
      this.task = gettask;
      this.titleModal = "Edit Task";
    }
  }

  get doneCSS(): object {
    let vm = this
    return {
      'fa':true,
      'm-t-20':true,
      'font-done':this.done
    };
  }

  get getTask(): object {
    return this.task;
  }

  finish(){
    let vm = this
    if(this.task.id==0)
      return
    vm.$store.dispatch("task/updateDone", {
      id:this.task.id,done:!this.done
    }).then(function (data) {
      console.log("Task done Successfully");
      Toast.makeText("Done Successfully", "long").show();
      //vm.$closeModal(vm);
    });
  }

  delete_() {
    let vm = this;
    confirm("Delete?").then((result) => {
      if (result) {
        if (this.task.id != 0) {
          vm.$store.dispatch("task/delete_", vm.task).then(function (data) {
            console.log("Task deleted Successfully");
            Toast.makeText("Deleted Successfully", "long").show();
            Notification.cancelNotification(vm.task.id);
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
      if (result) {
        if (vm.task.id == 0) {
          vm.$store.dispatch("task/save", vm.task).then(function (id) {
            console.log("task created Successfully");
            Toast.makeText("Created Successfully", "long").show();
            Notification.addNotification(vm.task, id, 1);
            Notification.addNotification(vm.task, id, 2);
            vm.$closeModal(vm);
          });
        } else {
          vm.$store.dispatch("task/update", vm.task).then(function (data) {
            console.log("task updates Successfully");
            Toast.makeText("Updated Successfully", "long").show();

            if(vm.wreminder != vm.task.reminder){
              Notification.cancelNotification(vm.task.scheduleid1)
            }
            if(vm.wreminder2 != vm.task.reminder2){
              Notification.cancelNotification(vm.task.scheduleid2)
            }
            Notification.addNotification(vm.task, vm.task.id, 1);
            Notification.addNotification(vm.task, vm.task.id, 2);
            vm.$closeModal(vm);
          });
        }
      }
    });
  }

  cancel() {
    this.$closeModal(this);
  }
}
</script>

<style scoped>
</style>
