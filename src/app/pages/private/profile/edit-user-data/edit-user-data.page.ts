import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { RegularExpressions } from '@constants/regular-expressions';
import { UsersStore } from '@features/users/store/users.store';
import { UpdateUserBody } from '@features/users/users.models';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSkeletonText,
  NavController,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

import { EditUserDataForm } from './edit-user-data.models';
import { EditUserDataValidators } from './edit-user-data.validators';

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.page.html',
  styleUrls: ['./edit-user-data.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonLabel,
    IonSkeletonText,
    IonContent,
    IonList,
    IonItem,
    IonButton,
    IonInput,
    TranslateModule,
    ReactiveFormsModule,
    RouterLink,
    HeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditUserDataPage {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly navController = inject(NavController);
  private readonly usersStore = inject(UsersStore);

  editUserDataForm = this.formBuilder.group<EditUserDataForm>({
    email: this.formBuilder.control('', [Validators.required, Validators.pattern(RegularExpressions.email)]),
    username: this.formBuilder.control('', Validators.required),
  });

  get emailControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.editUserDataForm.get('email');
  }

  constructor() {
    addIcons({ arrowBackOutline });

    effect(() => {
      const userData = this.usersStore.userData();

      if (userData === undefined) return;

      const formInitialValue = {
        email: userData.email,
        username: userData.username,
      };

      this.editUserDataForm.setValue(formInitialValue);

      this.editUserDataForm.addValidators(
        EditUserDataValidators.someControlValueChanged(['email', 'username'], formInitialValue),
      );
    });
  }

  getEmailError(errors: ValidationErrors | null): string {
    return errors?.['required'] ? 'validation.required' : 'validation.invalid_email';
  }

  updateUserData(): void {
    this.usersStore.updateUserData(<UpdateUserBody>this.editUserDataForm.value);
  }

  goToProfile(): void {
    this.navController.navigateBack('/profile');
  }
}
