import { Page } from '@playwright/test'

export class HelperBase {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async waitForNumberOfSeconds(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }
    
    async scrollToTheBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    async getBackToLogin() {
        await this.page.getByText('Back to Log In').click()
    }

    async navigateToRegistration() {
        await this.page.getByText('Register').click()
    }

}