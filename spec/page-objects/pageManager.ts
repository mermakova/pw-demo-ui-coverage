import { Page } from '@playwright/test'
import { NavigationPage } from './generalUI'
import { DatepickerPage } from './datepickerPage'
import { RequestPasswordPage } from './Auth/RequestPasswordPage'
import { ResetPasswordPage } from './Auth/ResetPasswordPage'
import { RegisterPage } from './Auth/RegisterPage'
import { LoginPage } from './Auth/LoginPage'


export class PageManager {

    private page: Page
    private readonly navigationPage: NavigationPage
    private readonly datepickerPage: DatepickerPage
    private readonly loginrPage: LoginPage
    private readonly requestPasswordPage: RequestPasswordPage
    private readonly resetPasswordPage: ResetPasswordPage
    private readonly registerPage: RegisterPage

    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)
        this.loginrPage = new LoginPage(this.page)
        this.requestPasswordPage = new RequestPasswordPage(this.page)
        this.resetPasswordPage = new ResetPasswordPage(this.page)
        this.registerPage = new RegisterPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onDatepickerPage(){
        return this.datepickerPage
    }

    onRequestPasswordPage(){
        return this.requestPasswordPage
    }

    onResetPasswordPage(){
        return this.resetPasswordPage
    }

    onRegisterPage(){
        return this.registerPage
    }

    onLoginPage(){
        return this.loginrPage
    }

}


