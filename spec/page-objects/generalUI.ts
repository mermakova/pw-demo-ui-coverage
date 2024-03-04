import { Locator, Page } from '@playwright/test'
import { HelperBase } from './helperBase'
import { expect } from '@playwright/test'

export class Header extends HelperBase{

    readonly header: Locator

    constructor (page: Page) {
        super(page)
    }

    async toggleSidebarMenu(){
        await this.page.locator('.sidebar-toggle').click()
    }

    async checkColorSchemeList() {
        const colorThemeDropDown = this.page.locator('ngx-header nb-select')
        const colorThemeOptionList = this.page.locator('nb-option-list nb-option')

        await colorThemeDropDown.click()
        await expect(colorThemeOptionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
        await colorThemeDropDown.click()
    }

    async selectColorScheme(scheme: string) {
        const colorThemeDropDown = this.page.locator('ngx-header nb-select')
        const colorThemeOptionList = this.page.locator('nb-option-list nb-option')
        await colorThemeDropDown.click()
        await colorThemeOptionList.filter({hasText: scheme}).click()

    }

    async checkColorScheme(rgb: string) {
        const header = this.page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color', rgb)
    }

    async expandSearch(){
        const searchInput = this.page.locator('.start-search')
        await searchInput.click()
    }

    async checkIfSearchIsVisible(visible: boolean){
        const searchInput = this.page.getByPlaceholder('Search...')
        if (visible) {
            await expect(searchInput).toBeVisible()
        } else {
            await expect(searchInput).not.toBeVisible()

            // Assertion to make the test green:
            // await expect(this.page.locator('nb-search-field')).toHaveAttribute('ng-reflect-show','false')
        }
    }

    async useSearch(prompt: string){
        const searchInput = this.page.getByPlaceholder('Search...')
        await searchInput.fill(prompt)
        await this.page.keyboard.press('Enter')
    }

    async checkIfMessagesAvailable(){
        const messages = this.page.locator('.eva-email-outline')
        await expect(messages).toBeVisible() 
        await expect(messages).toBeEnabled()
    }

    async checkIfNotificationsAvailable(){
        const messages = this.page.locator('.eva-bell-outline')
        await expect(messages).toBeVisible() 
        await expect(messages).toBeEnabled()
    }

    async openUserProfile(){
        const userMenu = this.page.locator('nb-layout-header nb-user')
        const userProfile = this.page.getByTitle('Profile')
        await userMenu.click()
        await userProfile.click()
        await expect(userProfile).not.toBeVisible() 
    }

    async logOutUser(){
        const userMenu = this.page.locator('nb-layout-header nb-user')
        const userLogOut = this.page.getByTitle('Log out')
        await userMenu.click()
        await userLogOut.click()
        await expect(userLogOut).not.toBeVisible() 
    }

}

export class NavigationPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumberOfSeconds(2)
    }

    async toasterPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async datePickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == 'false') {
            await groupMenuItem.click()
        }
    }

    /**
     * Checks if sidebar visible ot not based on flag
     * @param visible - check if visible (true), or hidden (false)
     */
    async checkIfSidebarMenuVisible(visible: boolean){
        const menuItem = this.page.getByText('FEATURES')
        if (visible) {
            await expect(menuItem).toBeVisible()
        } else {
            await expect(menuItem).not.toBeVisible()
        }
    }


}

export class Footer extends HelperBase {
    constructor (page: Page) {
        super(page)
    }

    async checkFooterInfo(){
        const createdBy = this.page.getByText('Created')
        const socials = this.page.locator('.socials')

        const copyright = (await createdBy.textContent()).trim()
        expect(copyright).toEqual('Created with ♥ by Akveo 2019')
        await expect(socials).toBeVisible()
    }
}