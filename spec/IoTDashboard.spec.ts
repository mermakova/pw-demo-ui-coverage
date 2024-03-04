import {expect, test} from '@playwright/test'
import { allure } from 'allure-playwright'
import { IoTDashboard } from './page-objects/IoTDashboard/IoTDevices'
import { ClimateControl } from './page-objects/IoTDashboard/ClimateControl'
import { Contacts } from './page-objects/IoTDashboard/Contacts'
import { Electricity } from './page-objects/IoTDashboard/Electricity'
import { Cameras } from './page-objects/IoTDashboard/Cameras'
import { ELECTRICITY_DATA, CONTACTS, CAMERAS } from './test-data/IoTDashboard'
import {TAGS} from './utils/meta-data'

test.beforeEach(async ({page}) => {
    await page.goto('/')
})

test(`User can switch devices On/Off`, {
    tag: [TAGS.IoTDashboard, TAGS.p1, TAGS.iOS]
}, async ({page}) => {
    allure.tags(TAGS.IoTDashboard, TAGS.p1)

    const dashboard = new IoTDashboard(page)
    
    await dashboard.checkDeviceStatus('Light', 'ON')
    await dashboard.clickOnDevice('Light')
    await dashboard.checkDeviceStatus('Light', 'OFF')

    await dashboard.clickOnDevice('Roller Shades')
    await dashboard.checkDeviceStatus('Roller Shades', 'OFF')
    
    await dashboard.clickOnDevice('Wireless Audio')
    await dashboard.checkDeviceStatus('Wireless Audio', 'OFF')
    
    await dashboard.clickOnDevice('Coffee Maker')
    await dashboard.checkDeviceStatus('Coffee Maker', 'OFF')
})


test.describe(`Climate control`, {
    tag: [TAGS.IoTDashboard]
}, () => {
    test('User can set temperature', {
        tag: [TAGS.p1]
    }, async ({page}) => {
        const climate = new ClimateControl(page)
        const tab = 'Temperature'
        await climate.openClimateTab(tab)
        await climate.setMaxClimateValue(tab)
        await climate.checkClimateSliderContent(tab,'30')
    })

    test('User can set temperature mode', {
        tag: [TAGS.p1]
    }, async ({page}) => {
        const climate = new ClimateControl(page)
        const tab = 'Temperature'
        const mode = 'heat'
        await climate.openClimateTab(tab)
        await climate.setClimateMode(tab, mode)
        await climate.checkClimateMode(tab, mode)
    })

    test('User can switch On/Off temperature control', {
        tag: [TAGS.p1]
    }, async ({page}) => {
        const climate = new ClimateControl(page)
        const tab = 'Temperature'
        await climate.openClimateTab(tab)
        await climate.checkClimateSliderContent(tab, 'Celsius')
        await climate.clickClimateControlSwitch(tab)
        await climate.checkClimateSliderContent(tab,'--')
    })

    test('User can set humidity mode', {
        tag: [TAGS.p1]
    }, async ({page}) => {
        const climate = new ClimateControl(page)
        const tab = 'Humidity'
        const mode = 'fan'
        await climate.openClimateTab(tab)
        await climate.setClimateMode(tab, mode)
        await climate.checkClimateMode(tab, mode)
    })

    test('User can switch On/Off humidity control', {
        tag: [TAGS.p1]
    }, async ({page}) => {
        const climate = new ClimateControl(page)
        const tab = 'Humidity'
        await climate.openClimateTab(tab)
        const humidityLevel = await climate.getClimateParameterValue(tab)
        expect(humidityLevel).toEqual(expect.any(Number))
        await climate.clickClimateControlSwitch(tab)
        await climate.checkClimateSliderContent(tab,'--')
    })

})

test.describe('Electricity Consumption', {
    tag: [TAGS.Electricity]
}, () => {
    test('Stat grid: User can see electicity stats per year', {
        tag: [TAGS.p1]
    }, async ({page}) => {
        await page.setViewportSize({
            width: 1400,
            height: 800,
          })
        const electicity = new Electricity(page)

        expect(await electicity.getYearOfActiveStatTab()).toEqual('2016')
        const defaultData = await electicity.getElectricityStatDataByYear('2016')
        expect(defaultData).toEqual(ELECTRICITY_DATA.y2016)

        await electicity.switchToYearTab('2017')
        expect(await electicity.getYearOfActiveStatTab()).toEqual('2017')
        const nonDefaultData = await electicity.getElectricityStatDataByYear('2017')
        expect(nonDefaultData).toEqual(ELECTRICITY_DATA.y2017)
    })

    test('Chart: User can switch chart range', {
        tag: [TAGS.p2]
    }, async ({page}) => {
        const electicity = new Electricity(page)
        await electicity.openElectricityChartMenu()
        const chartOptionList = page.getByRole('list').locator('nb-option')
        await expect(chartOptionList).toHaveText(['week', 'month', 'year'])
        await chartOptionList.filter({hasText: 'year'}).click()
    })
})


test('User can see default contact list', {
    tag: [TAGS.p1]
}, async ({page}) => {
    const contacts = new Contacts(page)
    const contactList = await contacts.getDefaultContacts()
    expect(contactList).toEqual(CONTACTS)
})

test('User can switch between single camera view and grid view on a Security Cameras widget', {
    tag: [TAGS.p1]
}, async ({page}) => {
    const cameras = new Cameras(page)
    expect(await cameras.getCameraList()).toEqual(CAMERAS)

    await cameras.switchCameraView('single')
    expect(await cameras.getCameraList()).toEqual(['Camera #1'])
    
    await cameras.switchCameraView('grid')
    expect(await cameras.getCameraList()).toEqual(CAMERAS)

    await cameras.selectCameraView('Camera #3')
    expect(await cameras.getCameraList()).toEqual(['Camera #3'])
})
