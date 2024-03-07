import { Page, expect } from '@playwright/test'
import { HelperBase } from '../helperBase'

export class RequestPasswordPage extends HelperBase {
    constructor (page: Page) {
        super(page)
    }

    async checkDefaultState() {
        const title = this.page.getByRole('heading')
        await expect(title).toHaveText('Forgot Password')
        await expect(this.page.locator('.sub-title')).toHaveText('Enter your email address and we’ll send a link to reset your password')
    }
    
    async submitRequestWithEmail(email: string) {
        await this.page.getByRole('textbox', {name: 'Email'}).fill(email)
        await this.page.getByRole('button').click()   
    }
}