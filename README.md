# ngrx-auth
This is the sample code for the Auth0 tutorial [Adding Authentication to NgRx](http://www.auth0.com/blog/add-auth-to-ngrx).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Getting Started

To get started, clone the repo, install the dependencies, and check out the "Starting point" commit to follow along with the tutorial.

```bash
git clone https://github.com/auth0-blog/ngrx-auth.git
cd ngrx-auth
npm install
git checkout 23c1b25
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`, as well as the NgRx schematics like `feature` or `reducer`.

## Using Auth0 for Authentication
This app uses [Auth0](https://auth0.com) to manage authentication.

### Sign Up for Auth0
You'll first need to sign up for an [Auth0](https://auth0.com) account. You can <a href="https://auth0.com/signup" data-amp-replace="CLIENT_ID" data-amp-addparams="anonId=CLIENT_ID(cid-scope-cookie-fallback-name)">sign up for a free Auth0 account here</a>.

### Set Up an Application
Once you've got your account, you can set up an application to use with our NgRx project. We'll only be setting up a Single Page Application (SPA) in Auth0 since we're using the Google Books API as our back end.

Here's how to set that up:

1. Go to your [**Auth0 Applications**](https://manage.auth0.com/#/applications) and click the "Create Application" button.
2. Name your new app, select "Single Page Web Applications," and click the "Create" button. You can skip the Quick Start and click on **Settings**.
3. In the **Settings** for your new Auth0 app, add `http://localhost:4200/callback` to the **Allowed Callback URLs**. (We're using `localhost:4200` since it's the default port for the Angular CLI `serve` command.)
4. Add `http://localhost:4200` to the **Allowed Logout URLs**.
5. Click the "Save Changes" button.
6. Copy down your **Domain** and **Client ID**. We'll use them in just a minute.
7. If you'd like, you can [set up some social connections](https://manage.auth0.com/#/connections/social). You can then enable them for your app in the **Application** options under the **Connections** tab. The example shown in the screenshot above utilizes username/password database, Facebook, Google, and Twitter.

> **Note:** Under the **OAuth** tab of **Advanced Settings** (at the bottom of the **Settings** section) you should see that the **JsonWebToken Signature Algorithm** is set to `RS256`. This is the default for new applications. If it is set to `HS256`, please change it to `RS256`. You can [read more about RS256 vs. HS256 JWT signing algorithms here](https://community.auth0.com/questions/6942/jwt-signing-algorithms-rs256-vs-hs256).

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.