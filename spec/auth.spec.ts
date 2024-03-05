import {test, expect} from '@playwright/test'
import { TAGS } from './utils/meta-data'
import { PageManager } from './page-objects/pageManager'
import { faker } from '@faker-js/faker'
import { ROUTES } from './utils/routes'
import { INVALID_PASSWORD, VALID_PASSWORD } from './test-data/auth'

test.beforeEach(async ({page}) => {
    await page.goto('/')
})

test.describe('Request Password', {
    tag: [TAGS.RequestPassword],
}, () => {
    test('User can request password by existing email', {
        tag: [TAGS.p1],
    }, async ({page}) => {      
        const pm = new PageManager(page)
        await pm.navigateTo().requestPasswordPage()
        await expect(page).toHaveURL(ROUTES.requestPassword);
        await pm.onRequestPasswordPage().checkDefaultState()

        const email = faker.internet.email()
        await pm.onRequestPasswordPage().submitRequestWithEmail(email)
        await expect(page).toHaveURL(ROUTES.iot);
    })

    test('User can get back from Request Password to Log in page', {
        tag: [TAGS.p3],
        annotation: {
            type: 'issue',
            description: 'UI bug: form validation fails preventing the click'
        }
    }, async ({page}) => {      
        const pm = new PageManager(page)
        await pm.navigateTo().requestPasswordPage()
        await pm.onRequestPasswordPage().getBackToLogin()
        await expect(page).toHaveURL(ROUTES.login)
    })

    test('User can navigate from Request Page to Registration', {
        tag: [TAGS.p3],
        annotation: {
            type: 'issue',
            description: 'UI bug: form validation fails preventing the click'
        }
    }, async ({page}) => {      
        const pm = new PageManager(page)
        await pm.navigateTo().requestPasswordPage()
        await pm.onRequestPasswordPage().navigateToRegistration()
        await expect(page).toHaveURL(ROUTES.register);
    })

})

test.describe('Reset Password', {
    tag: [TAGS.RequestPassword],
}, () => {
    test('User can reset password with valid pasword value', {
        tag: [TAGS.p1],
    }, async ({page}) =>{
        const pm = new PageManager(page)
        await pm.navigateTo().resetPasswordPage()
        await expect(page).toHaveURL(ROUTES.resetPassword);
        await pm.onResetPasswordPage().checkDefaultState()
        const password = faker.internet.password({length: 35})
        await pm.onResetPasswordPage().submitRequestWithValidPassword(password)
        await expect(page).toHaveURL(ROUTES.iot);
    })

    test('User can\'t reset password without filling out the form', {
        tag: [TAGS.p2],
    }, async ({page}) =>{
        const pm = new PageManager(page)
        await pm.navigateTo().resetPasswordPage()
        await pm.onResetPasswordPage().confirmPassword('')
        await pm.onResetPasswordPage().checkValidationResult([
            'Password is required!',
            'Password confirmation is required!'
        ])   
    })

    test('User can get back from Reset Password to Log in page', {
        tag: [TAGS.p3],
        annotation: {
            type: 'issue',
            description: 'UI bug: form validation fails preventing the click'
        }
    }, async ({page}) => {      
        const pm = new PageManager(page)
        await pm.navigateTo().resetPasswordPage()
        await pm.onResetPasswordPage().getBackToLogin()
        await expect(page).toHaveURL(ROUTES.login)
    })

    test('User can navigate from Reset Password to registration', {
        tag: [TAGS.p3],
        annotation: {
            type: 'issue',
            description: 'UI bug: form validation fails preventing the click'
        }
    }, async ({page}) => {      
        const pm = new PageManager(page)
        await pm.navigateTo().resetPasswordPage()
        await pm.onResetPasswordPage().navigateToRegistration()
        await expect(page).toHaveURL(ROUTES.register);
    })

    for(const [testCase, password] of Object.entries(INVALID_PASSWORD)) {
        test(`User can't use ${testCase} password`, {
            tag: [TAGS.p2],
        }, async ({page}) =>{
            const pm = new PageManager(page)
            await pm.navigateTo().resetPasswordPage()
            await pm.onResetPasswordPage().fillNewPassword(password)
            await pm.onResetPasswordPage().checkValidationResult([
                'Password should contains from 4 to 50 characters'
            ])
        })
    }

    test(`User can't reset the password without confirming it`, {
        tag: [TAGS.p2],
    }, async ({page}) =>{
        const pm = new PageManager(page)
        await pm.navigateTo().resetPasswordPage()
        await pm.onResetPasswordPage().fillNewPassword(VALID_PASSWORD)
        await pm.onResetPasswordPage().checkValidationResult([
            'Password confirmation is required!'
        ])
    })

    test('User can\'t reset the password if confirmation password doesn\'t match', {
        tag: [TAGS.p1],
        annotation: {
            type: 'issue',
            description: 'UI bug: the form could be submitted despite of the failed validation'
        }
    }, async ({page}) =>{
        const pm = new PageManager(page)
        await pm.navigateTo().resetPasswordPage()
        await pm.onResetPasswordPage().fillNewPassword(VALID_PASSWORD)
        await pm.onResetPasswordPage().confirmPassword(INVALID_PASSWORD['too small'])
        await pm.onResetPasswordPage().checkValidationResult([
            'Password does not match the confirm password.'
        ])
    })

    test('User can\'t reset the password if the main field isn\'t filled', {
        tag: [TAGS.p1],
    }, async ({page}) =>{
        const pm = new PageManager(page)
        await pm.navigateTo().resetPasswordPage()
        await pm.onResetPasswordPage().confirmPassword(VALID_PASSWORD)
        await pm.onResetPasswordPage().checkValidationResult([
            'Password is required!',
            'Password does not match the confirm password.'
        ])
    })

})

test.describe('Register', {
    tag: [TAGS.Register]
}, () => {
    test('User can register with valid data', {
        tag: [TAGS.p1],
    }, async ({page}) => {      
        const pm = new PageManager(page)
        await pm.navigateTo().registerPage()
        await expect(page).toHaveURL(ROUTES.register)

        const name = faker.person.lastName()
        const email = faker.internet.email()
        const password = faker.internet.password({length: 15})
        const isAgreedToTerms = true

        await pm.onRegisterPage().checkDefaultState()
        await pm.onRegisterPage().fillFormWithData(
            name,
            email,
            password,
            password,
            isAgreedToTerms
        )
        await pm.onRegisterPage().checkValidationResult([])
    })

    test('User can\'t register without filling in the form', {
        tag: [TAGS.p2],
    }, async ({page}) => {      
        const pm = new PageManager(page)
        await pm.navigateTo().registerPage()
        await expect(page).toHaveURL(ROUTES.register)

        await pm.onRegisterPage().fillFormWithData('','','','',false)
        await pm.onRegisterPage().checkValidationResult([
            'Email is required!',
            'Password is required!',
            'Password confirmation is required!'
        ])
    })

    test('User can\'t register without filling in Full name', {
        tag: [TAGS.p1],
        annotation: {
            type: 'issue',
            description: 'UI bug: no validation on filling out Full name'
        }
    }, async ({page}) => {      
        const pm = new PageManager(page)
        await pm.navigateTo().registerPage()
        await expect(page).toHaveURL(ROUTES.register)

        const name = ''
        const email = faker.internet.email()
        const password = faker.internet.password({length: 15})
        const isAgreedToTerms = true

        await pm.onRegisterPage().fillFormWithData(
            name,
            email,
            password,
            password,
            isAgreedToTerms
        )

        await pm.onRegisterPage().checkValidationResult([
            'Full name is required'
        ])
    })

    test('User can\'t register without filling out Email', {
        tag: [TAGS.p1],
    }, async ({page}) => {      
        const pm = new PageManager(page)
        await pm.navigateTo().registerPage()
        await expect(page).toHaveURL(ROUTES.register)

        const name = faker.person.lastName()
        const email = ''
        const password = faker.internet.password({length: 15})
        const isAgreedToTerms = true

        await pm.onRegisterPage().checkDefaultState()
        await pm.onRegisterPage().fillFormWithData(
            name,
            email,
            password,
            password,
            isAgreedToTerms
        )
        await pm.onRegisterPage().checkValidationResult(['Email is required!'])
    })

    test('User can\'t register without filling out Password', {
        tag: [TAGS.p1],
    }, async ({page}) => {      
        const pm = new PageManager(page)
        await pm.navigateTo().registerPage()
        await expect(page).toHaveURL(ROUTES.register)

        const name = faker.person.lastName()
        const email = faker.internet.email()
        const rePassword = faker.internet.password({length: 15})
        const isAgreedToTerms = true

        await pm.onRegisterPage().checkDefaultState()
        await pm.onRegisterPage().fillFormWithData(
            name,
            email,
            '',
            rePassword,
            isAgreedToTerms
        )
        await pm.onRegisterPage().checkValidationResult(['Password is required!'])
    })

    test('User can\'t register without if the first password and the repeated one doesn\'t match', {
        tag: [TAGS.p1],
        annotation: {
            type: 'issue',
            description: 'UI bug: the form is submittable even if the passwords do not match'
        }
    }, async ({page}) => {      
        const pm = new PageManager(page)
        await pm.navigateTo().registerPage()
        await expect(page).toHaveURL(ROUTES.register)

        const name = faker.person.lastName()
        const email = faker.internet.email()
        const password = faker.internet.password({length: 15})
        const rePassword = faker.internet.password({length: 15})
        const isAgreedToTerms = true

        await pm.onRegisterPage().checkDefaultState()
        await pm.onRegisterPage().fillFormWithData(
            name,
            email,
            password,
            rePassword,
            isAgreedToTerms
        )
        await pm.onRegisterPage().checkValidationResult(['Password does not match the confirm password.'])
    })

    test('User can\'t register without agreeing to terms', {
        tag: [TAGS.p1],
        annotation: {
            type: 'issue',
            description: 'UI bug: the form is submittable even if the passwords do not match'
        }
    }, async ({page}) => {      
        const pm = new PageManager(page)
        await pm.navigateTo().registerPage()
        await expect(page).toHaveURL(ROUTES.register)

        const name = faker.person.lastName()
        const email = faker.internet.email()
        const password = faker.internet.password({length: 15})
        const isAgreedToTerms = false

        await pm.onRegisterPage().checkDefaultState()
        await pm.onRegisterPage().fillFormWithData(
            name,
            email,
            password,
            password,
            isAgreedToTerms
        )
        await pm.onRegisterPage().checkRegisterButton(false)
    })
})

test.describe('Login', {}, () => {
    
})