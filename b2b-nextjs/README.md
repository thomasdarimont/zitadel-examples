This is a demo showcasing how you can use ZITADEL in a B2B (Business-to-Business) context, where a company is providing a customer portal to their customers:

- A user of the customer should see all granted projects in the portal
- A admin user of the customers sees a list of customer's users (could be expanded to make roles editable)

## Getting Started

To run this sample locally you need to install dependencies first.

Type and execute:

```bash
yarn install
```
then, to run the development server:

```bash
npm run dev
# or
yarn dev
```

and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ZITADEL Setup

### Application Setup

To setup this sample you have to create a project and an application in your organization (eg, `B2B-Demo`) first.

Open [Console](https://console.zitadel.ch/projects) and create a new project. Let's call it `Project`.

Then on the project detail page click on new application and enter a name for this app. Let's call this one `portal-web`. Select `Web`, continue, `PKCE`, then enter `http://localhost:3000/api/auth/callback/zitadel` for the redirect, post redirect can be kept empty. Then press on `create`.

Copy the clientId as you will need this in your apps environment configuration file later.

On the application detail page open the collapsed section under redirect settings and enable `Development Mode`. This will allow you application to work on `localhost:3000`. Make sure to save your change.

### Secret

Now clone this project and navigate to its root folder. Create a file `.env.local` and copy paste the following:

```
NEXTAUTH_URL=http://localhost:3000
ORG_ID={YourOrgId}
PROJECT_ID={YourProjectId}
ZITADEL_CLIENT_ID={YourClientID}
SERVICE_ACCOUNT_SECRET={YourServiceAccountSecret}
```

`ORG_ID`: You can find `{YourOrgId}` by selecting the B2B-Demo organization in Console and click on "Organisation" on the left sidepanel. `{YourOrgId}` is displayed in right sidepanel labeled as "Resource Id".

`PROJECT_ID`: You can find `{YourProjectId}` by clicking on "Projects" on the sidepanel and select the Project `Portal`. `{YourProjectId}` is displayed in the right sidepanel labeled as "Resource Id".

`ZITADEL_CLIENT_ID`: Having the project `Portal` selected, click on the Application `Web`. `{YourClientID}` is displayed in the top-center, labeled as "Client Id".

`SERVICE_ACCOUNT_SECRET`: Setup a service user and copy the account secret here (see below)

### Service User

To make this application work you need a service user which loads granted-projects and user-grants for you.
In the B2B-Demo organization, navigate to `Service-Users` in the side navigation panel of Console and create a new service-user.
Let's set its username to `nextjs` and its name to `NextJS`. Then press `create`.

On the detail page, add a new key, set an optional expiration date and download the generated JSON file.
Copy the content of this file right after `SERVICE_ACCOUNT_SECRET=` in your configuration file.

Back in Console, click onto the plus sign in the right sidepanel to grant access to your service user.
Select `owned project`, search for `B2B-Demo` and select `PROJECT_OWNER_VIEWER` as the management role.

### Roles

To setup the needed roles for your project, navigate to your Portal project, and add the following roles

| Key    | Display Name  | Group | Description                                                            |
| :----- | :------------ | :---- | ---------------------------------------------------------------------- |
| admin  | Administrator |       | The administrator, allowed to read granted projects and to user grants |
| reader | Reader        |       | A user who is allowed to read his organizations granted projects only  |

Now make sure to enable `Assert Roles on Authentication` above the role table. This makes sure that roles, which is used by the application to enable UI components, are set in your OIDC ID Token.

### Delegate the project to another organization

Create a new organization in Console. Easiest way is to use the organization dropdown on the top left. Let's call this new organization `B2B-Demo-Customer`. 

Switch to the `B2B-Demo` organization, select Projects in the left sidepanel, and click on `Portal`. [Grant all roles of the Project](https://docs.zitadel.ch/docs/guides/basics/projects#exercise---grant-a-project) to the organization `b2b-demo-customer.zitadel.ch`.

Now switch back to the organization `B2B-Demo-Customer`, [create a new user](https://docs.zitadel.ch/docs/manuals/user-register) in this organization. Select Granted Projects on the left side panel and click on `Portal`. Add an authorization to the newly created user.

### Login

You should be able to login with the user created in the organization `B2B-Demo-Customer`and see all granted projects.

Switch to authorizations to view all users and their roles. You may extend the application here to make role-assignment possible within the portal.

## What does it do?:

Users with `view` role can view granted projects on their organization which were granted by your organization (owning this portal application).
Users with `admin` role can view granted projects and list users of the selected organization who are granted to use the portal application too.

![app screen](./public/screenshot.png)
