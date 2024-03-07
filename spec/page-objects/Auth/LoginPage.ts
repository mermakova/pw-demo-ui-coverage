import { Page, expect } from '@playwright/test'
import { HelperBase } from '../helperBase'

export class LoginPage extends HelperBase {
    constructor (page: Page) {
        super(page)
    }

    async checkDefaultState() {
        const title = this.page.getByRole('heading')
        await expect(title).toHaveText('Login')
        await expect(this.page.locator('.sub-title')).toHaveText('Hello! Log in with your email.')
        await expect(this.page.getByRole('button')).toBeDisabled()
    }
    
    async fillFormWithData(
        email: string, 
        password: string, 
        rememberMe: boolean
    ) {
        await this.page.getByPlaceholder('Email address').fill(email)
        await this.page.getByPlaceholder('Password').fill(password)

        if (rememberMe)
            await this.page.getByRole('checkbox').check({force: true})
    }
}
