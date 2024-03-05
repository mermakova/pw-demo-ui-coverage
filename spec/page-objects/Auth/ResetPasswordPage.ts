import { Page, expect } from '@playwright/test'
import { HelperBase } from '../helperBase'

export class ResetPasswordPage extends HelperBase {
    constructor (page: Page) {
        super(page)
    }

    async checkDefaultState() {
        const title = this.page.getByRole('heading')
        await expect(title).toHaveText('Change password')
        await expect(this.page.locator('.sub-title')).toHaveText('Please set a new password')
        await expect(this.page.getByRole('button')).toBeDisabled()
    }
    
    async submitRequestWithValidPassword(password: string) {
        await this.page.getByRole('textbox', {name: 'New Password'}).fill(password)
        await this.page.getByRole('textbox', {name: 'Confirm Password'}).fill(password)
        await this.page.getByRole('heading', { name: 'Change password' }).click()
        await this.checkValidationResult([])
        await this.page.getByRole('button').click()   
    }

    async fillNewPassword(password: string) {
        await this.page.getByRole('textbox', {name: 'New Password'}).fill(password)
    }

    async confirmPassword(password: string) {
        await this.page.getByRole('textbox', {name: 'Confirm Password'}).fill(password)
    }

    async checkValidationResult(expected: string[]) {
        await this.page.getByRole('heading', { name: 'Change password' }).click()
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

}
