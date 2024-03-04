import { Page, expect } from '@playwright/test'
import { HelperBase } from './helperBase'

export class DatepickerPage extends HelperBase{

    constructor (page: Page) {
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
        const dateInput = this.page.getByPlaceholder('Form Picker')
        await dateInput.click()

        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
        await expect(dateInput).toHaveValue(dateToAssert)
    }

    async selectDatePickerWithRangeFromToday(startDateFromToday: number, endDayFromToday: number) {
        const dateInput = this.page.getByPlaceholder('Range Picker')
        await dateInput.click()

        const startDateToAssert = await this.selectDateInTheCalendar(startDateFromToday)
        const endDateToAssert = await this.selectDateInTheCalendar(endDayFromToday)

        await expect(dateInput).toHaveValue(`${startDateToAssert} - ${endDateToAssert}`)

    }


    private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleDateString('en-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleDateString('en-US', {month: 'long'})
        const expectedYear = date.getFullYear().toString()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    
        // short way:
        // const expectedDateFull = date.toLocaleDateString('en-US', {month: 'short', year: 'numeric', day: 'numeric'})
    
        // geting current Month+Year from a datepicker
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
    
        // building expected date string to assertion from date object
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
    
        // switching to the next month
        // if current month isn't the same as expected, then we need to select the next month and check again
        while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
    
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()
        return dateToAssert
    }
}