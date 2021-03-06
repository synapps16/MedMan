import {
    Component
} from '@angular/core';
import {
    IonicPage,
    NavController,
    AlertController
} from 'ionic-angular';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    AuthProvider
} from '../../providers/auth/auth';
import {
    EmailValidator
} from '../../validators/email';

/**
 * Generated class for the ResetpasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-resetpassword',
    templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {
    public resetPasswordForm: FormGroup;

    constructor(public authData: AuthProvider, public formBuilder: FormBuilder,
        public nav: NavController, public alertCtrl: AlertController) {

        this.resetPasswordForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        });
        }


            resetPassword() {
                if (!this.resetPasswordForm.valid) {
                    console.log(this.resetPasswordForm.value);
                } else {
                    this.authData.resetPassword(this.resetPasswordForm.value.email)
                        .then((user) => {
                            let alert = this.alertCtrl.create({
                                message: "Wir haben ihnen soeben einen Widerherstellungslink an Ihre E-Mail-Adresse gesendet",
                                buttons: [{
                                    text: "Ok",
                                    role: 'cancel',
                                    handler: () => {
                                        this.nav.pop();
                                    }
                                }]
                            });
                            alert.present();
                        }, (error) => {
                            var errorMessage: string = error.message;
                            let errorAlert = this.alertCtrl.create({
                                message: "Leider ist uns diese E-Mail-Adresse nicht bekannt",
                                buttons: [{
                                    text: "Ok",
                                    role: 'cancel'
                                }]
                            });
                            errorAlert.present();
                        });
                }
            }
        

    

    ionViewDidLoad() {
        console.log('ionViewDidLoad ResetpasswordPage');
    }

}