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

}