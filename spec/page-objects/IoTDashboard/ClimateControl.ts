import { Locator, Page, expect } from '@playwright/test'

export class ClimateControl{
    page: Page

    constructor (page: Page) {
        this.page = page
    }

    /**
     * Method opens tab on climate control panel by the tab name
     * @param name - tab name: Temperature/Humidity
     */
    async openClimateTab(name:string) {
        await this.page.locator('ngx-temperature li').filter({hasText: name}).click()
    }

    /**
     * Set max temperature value on a temperature slider
     * @param parameter
     */
    async setMaxClimateValue(parameter: string) {
        const temperatureBox = this.page.locator(`[tabtitle="${parameter}"] ngx-temperature-dragger`)

        // Mouse movement
        await temperatureBox.scrollIntoViewIfNeeded()
        // coordinates of the box
        const box = await temperatureBox.boundingBox()
        // center of the box
        const x = box.x + box.width/2
        const y = box.y + box.height/2

        await this.page.mouse.move(x,y)
        await this.page.mouse.down()
        await this.page.mouse.move(x + 100, y)
        await this.page.mouse.move(x + 100, y + 100)
        await this.page.mouse.up()
    }

    /**
     * Set mode by tab and mode name
     * @param parameter
     * @param mode - ['cool'|'warm'|'heat'|'fan']
     */
    async setClimateMode(parameter: string, mode:string) {

        const buttonGroup = this.page.locator(`nb-radio-group[name="${parameter.toLowerCase()}-mode"]`)
        await buttonGroup.locator(`nb-radio[value="${mode}"]`).click()
    }    

    /**
     * Checks content presence in temperature box
     * @param parameter
     * @param value
     */    
    async checkClimateSliderContent(parameter: string, value: string){
        // const title = parameter.charAt(0).toUpperCase() + parameter.slice(1)
        const box = this.page.locator(`[tabtitle="${parameter}"] ngx-temperature-dragger`)
        await expect(box).toContainText(value)
    }

    /**
     * Checks that climate mode is set correctly
     * @param parameter
     * @param mode
     */    
    async checkClimateMode(parameter: string, mode: string){
        const box = this.page.locator(`nb-radio-group[name="${parameter.toLowerCase()}-mode"]`)
        // await expect(temperatureBox).toContainText(value)
        await expect(box).toHaveAttribute('ng-reflect-model',mode)
    }

    /**
     * Method clicks on/off button at climate tab by the tab name
     * @param name - tab name: Temperature/Humidity
     */
    async clickClimateControlSwitch(name:string) {
        await this.page.locator(`[tabtitle="${name}"] ngx-temperature-dragger button`).click()
    }    

    /**
     * Method returns current value of a passed climate parameter
     * @param name
     */
    async getClimateParameterValue(name: string) {
        const box = this.page.locator(`[tabtitle="${name}"] ngx-temperature-dragger`)
        return parseInt((await box.textContent()).trim())
    }    








}