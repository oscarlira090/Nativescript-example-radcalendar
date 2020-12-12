import { Vue } from "vue-property-decorator";

declare module "vue-property-decorator" {
  interface Vue {
    //$navigateTo(args);
    $goTo(args);
    $gotToModal(args);
    $closeModal(args);
    
  }
}