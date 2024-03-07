import { Locator, Page, expect } from '@playwright/test'

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

    async navigateToReequestPassword() {
        await this.page.getByText('Forgot Password?').click()
    }

    async checkSubmitButton(shouldBeEnabled: boolean){
        if (shouldBeEnabled) 
            await expect(this.page.getByRole('button')).toBeEnabled()
        else
            await expect(this.page.getByRole('button')).toBeDisabled()
    }

    async checkValidationResult(expected: string[]) {
        await this.page.getByRole('heading').click()
        if (expected.length != 0) 
            await expect(this.page.getByRole('button')).toBeDisabled()
        else
            await expect(this.page.getByRole('button')).toBeEnabled()

        const warningList = this.page.locator('p.status-danger')
        const warningCount = await warningList.count()
        const parsedWarnings = []

        for (let i = 0; i < warningCount; i++) {
            const warning = await warningList.nth(i).textContent()
            parsedWarnings.push(warning.trim())
        }

        expect(parsedWarnings).toEqual(expected)
    }

    async submitForm(){
        await this.page.getByRole('button').click()
    }

}