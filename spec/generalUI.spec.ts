import {test} from '@playwright/test'
import { NavigationPage, Header, Footer } from './page-objects/generalUI'
import { TAGS } from './utils/meta-data'
import { IoTDashboard } from './page-objects/IoTDashboard/IoTDevices'

test.beforeEach(async ({page}) => {
    await page.goto('/')
})

test.describe('App header', {
    tag: [TAGS.General],
}, () => {
    test('User can hide and expand navigation menu', {
        tag: [TAGS.p1],
    }, async ({page}) => {
        const navigation = new NavigationPage(page)
        const header = new Header(page)

        await navigation.checkIfSidebarMenuVisible(true)
        await header.toggleSidebarMenu()
        await navigation.checkIfSidebarMenuVisible(false)   
        await header.toggleSidebarMenu()
        await navigation.checkIfSidebarMenuVisible(true)
    })

    test('User can change color scheme from the header menu', {
        tag: [TAGS.p2],
    }, async ({page}) => {
        const colors = {
            'Light': 'rgb(255, 255, 255)',
            'Dark': 'rgb(34, 43, 69)',
            'Cosmic': 'rgb(50, 50, 89)',
            'Corporate': 'rgb(255, 255, 255)'
        }
        const header = new Header(page)

        await header.checkColorSchemeList()
        for(const color in colors){
            await header.selectColorScheme(color)
            await header.checkColorScheme(colors[color])
        }
    })

    test('User can perform global search', {
        tag: TAGS.p1,
        annotation: {
            type: 'issue',
            description: 'UI Inconsistency bug: searchInput still visible in DOM, but it doesn\'t visible for the user'
        }
    }, 
    async ({page}) => {
        const header = new Header(page)
        await header.expandSearch()
        await header.checkIfSearchIsVisible(true)
        await header.useSearch('Beatles')
        await header.checkIfSearchIsVisible(false)
    })

    test('User have access to messages', {
        tag: [TAGS.p1],
    }, async ({page}) => {
        const header = new Header(page)
        await header.checkIfMessagesAvailable()
    })

    test('User have access to notifications', {
        tag: [TAGS.p1],
    }, async ({page}) => {
        const header = new Header(page)
        await header.checkIfNotificationsAvailable()
    })

    test('User can access account menu', {
        tag: [TAGS.p1],
    }, async ({page}) => {
        const header = new Header(page)
        await header.openUserProfile()
    })

    test('User can log out of the application', {
        tag: [TAGS.p1],
    }, async ({page}) => {
        const header = new Header(page)
        await header.logOutUser()
    })
})

test.describe('App footer', {
    tag: [TAGS.p3],
}, () => {
    test('User can see copyright and social media links', async ({page}, testInfo) => {
        const footer = new Footer(page)
        await footer.checkFooterInfo()
    })
})


