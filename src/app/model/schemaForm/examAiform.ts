import {
    UntypedFormBuilder,
    Validators,
    AbstractControl
} from '@angular/forms';

export class examAiform {
    /**login */
    static getLoginForm() {
        return new UntypedFormBuilder().group({
            email: ['', [Validators.required, Validators.email]],
            password: [
                '',
                [
                    Validators.required,
                    // Validators.minLength(8),
                    // Validators.pattern(
                    //     '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-={}\\[\\]|;:\'\\"<>,./?]).+$'
                    // )
                ]
            ]
        });
    }

    /**Sign up */
    static getSignUpForm() {
        return new UntypedFormBuilder().group(
            {
                email: ['', [Validators.required, Validators.email]],
                gender: [
                    '',
                    [Validators.required]
                ],
                password: [
                    '',
                    [
                        Validators.required,
                    ]
                ],
                confirmpassword: [
                    '',
                    [
                        Validators.required,
                    ]
                ],

            },
            {
                validators: this.passwordsMatchValidator
            }
        );
    }
    /**add profile */
    static getProfileForm() {
        return new UntypedFormBuilder().group(
            {
                email: ['', [Validators.required, Validators.email]],
                name: ['', [Validators.required]],
                phone: ['', [Validators.required]],
                skill: ['', [Validators.required]],
                current_ctc: ['', [Validators.required]],
                expected_ctc: ['', [Validators.required]],
                experience: ['', [Validators.required]],
                filename: ['']
            }
        );
    }
    /**scheduledForm */
    static sheduledMettingForm() {
        return new UntypedFormBuilder().group({
            title: [''],
            start_time: [''],
            description: [''],
            location: ['']

        })
    }


    //match password validator
    static passwordsMatchValidator(
        control: AbstractControl
    ): { [key: string]: boolean } | null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmpassword');

        if (
            password &&
            confirmPassword &&
            password.value !== confirmPassword.value
        ) {
            confirmPassword.setErrors({ passwordsNotMatch: true });
            return { passwordsNotMatch: true };
        }

        return null;
    }
}
