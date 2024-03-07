import { Page, expect } from '@playwright/test'
import { HelperBase } from '../helperBase'

export class RegisterPage extends HelperBase {
    constructor (page: Page) {
        super(page)
    }

    async checkDefaultState() {
        const title = this.page.getByRole('heading')
        await expect(title).toHaveText('Register')
        await expect(this.page.getByRole('button')).toBeDisabled()
    }
    
    async fillFormWithData(
        name: string,
        email: string, 
        password: string, 
        repeatPassword: string, 
        isAgreedToTerms: boolean
    ) {
        await this.page.getByPlaceholder('Full name').fill(name)
        await this.page.getByPlaceholder('Email address').fill(email)
        await this.page.getByPlaceholder('Password', { exact: true }).fill(password)
        await this.page.getByPlaceholder('Confirm Password').fill(repeatPassword)

        if (isAgreedToTerms)
            await this.page.locator('.custom-checkbox').click()
    }
}
