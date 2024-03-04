import { Locator, Page } from '@playwright/test'

export class Electricity{
    page: Page

    constructor (page: Page) {
        this.page = page
    }

    /**
     * In Electricity Consumption widget selects tab for a specific year
     * @param year 
     */
    async switchToYearTab(year: string) {
        const electricityWidget = this.page.locator('nb-card', {hasText: 'Electricity Consumption'})
        await electricityWidget.locator('li', {hasText: `${year}`}).click()
    }

    /**
     * In Electricity Consumption widget returns year from the active tab
     * @param year 
     */
    async getYearOfActiveStatTab() {
        const electricityWidget = this.page.locator('nb-card', {hasText: 'Electricity Consumption'})
        const year = await electricityWidget.locator('li.active').textContent()
        return year
    }

    /**
     * Returns Electricity Consumption by year
     * @param year 
     */
    async getElectricityStatDataByYear(year: string) {
        const grid = this.page.locator(`[ng-reflect-tab-title="${year}"] nb-list`) 
        const data = []
        for (const li of await grid.getByRole('listitem').all()){
            const liContent = await li.textContent()
            data.push(liContent.split(/\ |\//).filter(el => !(['kWh','USD',''].includes(el))))
        }
        return data
    }

    /**
     * Opens electricity chart menu to switch time span
     */
    async openElectricityChartMenu() {
        await this.page.locator('ngx-electricity nb-card-header button').click()
    }
}