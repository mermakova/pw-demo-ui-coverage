import { Locator, Page } from '@playwright/test'

export class Cameras{
    page: Page

    constructor (page: Page) {
        this.page = page
    }

    /**
     * Get a list of cameras from the grid
     */
    async getCameraList() {
        const cameraGrid = this.page.locator('ngx-security-cameras .grid-container')
        const data = []
        for (const li of await cameraGrid.getByText('Camera').all()){
            const liContent = await li.textContent()
            data.push(liContent)
        }
        return data
    }

    /**
     * Switch to camera view mode
     * @param view - ['single'|'grid'] 
     */
    async switchCameraView(view: string) {
        await this.page.locator(`ngx-security-cameras button[class*='${view}']`).click()
    }

    /**
     * Switch to a camera view by its title
     * @param camera - camera title 
     */
    async selectCameraView(camera: string) {
        await this.page.locator('ngx-security-cameras').getByText(camera).click()
    }
    
}