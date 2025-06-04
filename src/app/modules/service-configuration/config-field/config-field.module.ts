import { CommonModule } from "@angular/common";
import { ConfigFeildStateModule } from "./config-field-state.module";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { ConfigFeildRoute } from "./config-field.routing";
import { ConfigFieldComponent } from "./pages/config-field/config-field.component";
import { ConfigFieldFormComponent } from "./components/config-field-form/config-field-form.component";
import { ConfigFieldModalComponent } from "./components/config-field-modal/config-field-modal.component";
import { ConfigFieldGroupModalComponent } from "./components/config-field-group-modal/config-field-group-modal.component";


@NgModule({
    imports: [
      ConfigFeildStateModule,
      CommonModule,
      SharedModule,
      ConfigFeildRoute,
    ],
    declarations: [
        ConfigFieldComponent,
        ConfigFieldFormComponent,
        ConfigFieldModalComponent,
        ConfigFieldGroupModalComponent
    ],
    providers: []
  })
  export class ConfigFeildModule {}