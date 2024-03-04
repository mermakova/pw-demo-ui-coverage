import { Locator, Page, expect } from '@playwright/test'
import { stat } from 'fs'

export class IoTDashboard{
    page: Page
    readonly device: Locator

    constructor (page: Page) {
        this.page = page
        this.device = page.locator('ngx-dashboard ngx-status-card')
    }

    /**
     * Method returns device locator by device name
     * @param name 
     */
    getDeviceByName(name:string): Locator {
        return this.device.filter({hasText: name})
    }

    /**
     * Method returns device status by device name
     * @param name 
     */
    async isDeviceSwitchedOn(name: string): Promise<boolean>{
        const deviceStatus = await this.getDeviceByName(name).locator('.status').textContent()
        if (deviceStatus == 'ON') 
            return true
        else if (deviceStatus == 'OFF')
            return false
    }

    async clickOnDevice(name:string) {
        const device = this.getDeviceByName(name)
        await device.click()
    }

    /**
     * Method checks device status by device name
     * @param name 
     */
    async checkDeviceStatus(name: string, status: string) {
        const deviceStatus = await this.getDeviceByName(name).locator('.status').textContent()
        expect(deviceStatus).toEqual(status)
    }

}