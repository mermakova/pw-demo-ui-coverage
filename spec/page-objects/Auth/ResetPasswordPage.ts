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

    async fillNewPassword(password: string) {
        await this.page.getByRole('textbox', {name: 'New Password'}).fill(password)
    }

    async confirmPassword(password: string) {
        await this.page.getByRole('textbox', {name: 'Confirm Password'}).fill(password)
    }

}
