import { Locator, Page } from '@playwright/test'

export class Contacts{
    page: Page

    constructor (page: Page) {
        this.page = page
    }

    /**
     * Get a list of contants from the tab 'Contacts'
     */
    async getDefaultContacts() {
        const contactList = this.page.locator('ngx-contacts [tabtitle="Contacts"]')
        const data = []
        for (const li of await contactList.getByRole('listitem').all()){
            const liContent = await li.locator('.info-container div').allTextContents()
            data.push(liContent)
        }
        return data
    }
}