import { Page, expect } from '@playwright/test'
import { NavigationPage } from './generalUI'
import { DatepickerPage } from './datepickerPage'


export class PageManager {

    private page: Page
    private readonly navigationPage: NavigationPage
    private readonly datepickerPage: DatepickerPage

    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onDatepickerPage(){
        return this.datepickerPage
    }

}


