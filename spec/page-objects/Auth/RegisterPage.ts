import { Page, expect } from '@playwright/test'
import { HelperBase } from '../helperBase'
import { ENGINE_METHOD_RAND } from 'constants'

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

    async checkValidationResult(expected: string[]) {
        await this.page.getByRole('heading', { name: 'Register' }).click()
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

    async checkRegisterButton(shouldBeEnabled: boolean){
        if (shouldBeEnabled) 
            await expect(this.page.getByRole('button')).toBeEnabled()
        else
            await expect(this.page.getByRole('button')).toBeDisabled()
    }

}
