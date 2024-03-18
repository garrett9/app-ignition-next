# NextJS Boilerplate Application for AppIgnition

## Introduction

This application is a boilerplate [NextJS](https://nextjs.org) application that can be easily installed with your Laravel applications through [AppIgnition](https://app-ignition.com). It has already been configured with several features that will allow you to start creating your next greatest idea as soon as it's installed.
- The [MUI](https://mui.com) component library has already been installed and configured.
- The look and feel of your application is ready to be modified through MUI's configured theme.
- A basic implementation of several authentication features is ready to be connected to your back end. This includes several middleware scripts that determine whether a user is logged in, verified, etc.
- A robust configuration of ESLint is included for an optimal React & NextJS development experience.
- The [next-intl](https://next-intl-docs.vercel.app) plugin for internationalization has been added and is ready for immediate use.
- A basic GitHub workflow and CircleCI configuration has been configured for verifying your builds on new PRs against your `main` branch.

Continue reading this documentation for a more in-depth understanding on all of these features, and different ways you can customize them.

### Index
- [Installation](#installation)
- [MUI](#mui)
- [Authentication](#authentication)
- [API Utilities](#utilities)
- [ESLint & Prettier](#linting)
- [Internationalization](#internationalization)
- [Continuous Integration](#ci)
- [SEO](#seo)

<span id="installation"></span>

## Installation

### AppIgnition
The recommended approach to install this boilerplate application is to use the [AppIgnition](https://app-ignition.com) Docker Desktop extension. With this extension, you can easily configure a Laravel back end to include a NextJS front end in minutes. This will also provide a pre-built NodeJS workspace Docker container for you to develop your application.

### Manual
If you'd rather install this application manually, you must first clone this repository.
```bash
git clone https://github.com/garrett9/app-ignition-next my-app
cd my-app
# The `.git` folder can be removed so that you can start a new Git repository from scratch.
rm -rf .git
git init
```

Next, on your Laravel back end, run the following:
```bash
# Install Laravel Breeze and dependencies...
composer require laravel/breeze --dev
php artisan breeze:install api
php artisan migrate
```
This will utilize Laravel Sanctum for handling authentication and create basic API endpoints for login and registration. This will work out-of-the box so long as your front-end and back-end applications share the same top-level domain.

### Environment
If you install this boilerplate using `AppIgnition`, these variables will be automatically set for you. However, if you're installing it manually, make sure to copy the `.env.example` file to a `.env` file. Then, provide the following variables for your environment.
```bash
# The name of your application
NEXT_PUBLIC_APP_NAME="AppIgnition"

# Ensures your application is exposed from your Docker container.
# Use "localhost" if you're developing outside of your container.
NEXT_HOST="0.0.0.0"

# Your application's Port
NEXT_PORT=3000

# The URL to your back-end server. 
#
# It must share the same top-level domain as your front-end server to properly
# authenticate with your back end using cookies. This can be achieved by modifying your
# hosts file if you're hosting the application within a docker container
NEXT_PUBLIC_BACKEND_URL=

# The URL of your application
NEXT_PUBLIC_FRONTEND_URL=
```

Once you're ready to begin developing, you can now run the following in your NextJS application.
```bash
npm run dev
```

<span id="mui"></span>

## MUI

### Configuration
[MUI](https://mui.com) is an extensive React component library offering everything you would need to build a production-level application. It has already been installed and configured in this boilerplate, allowing you to start using it immediately. If you wish to configure MUI beyond what has been preconfigured, you can do so in the `src/theme.ts` file.

```ts
'use client';

import type {} from '@mui/lab/themeAugmentation';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const CARD_SPACING = 3;

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  palette: {
    mode: 'dark',
    // See how you can customize your theme's palette: https://mui.com/material-ui/customization/palette/
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    // Learn how to globally customize your components: https://mui.com/material-ui/customization/theme-components/
    MuiGrid: {
      // You can customize a component's default properties
      defaultProps: {
        spacing: 2,
      },
    },
  ...
  }
}
```

MUI offers a convenient way to modify the look and feel of your application all within a single TypeScript file. The configuration options are so extensive that its possible to build a feature complete application without writing a single line of CSS code. To get started, it's best to read about [customizing your theme's color palette](https://mui.com/material-ui/customization/palette/) or [how to globally customize your components](https://mui.com/material-ui/customization/theme-components/).

<span id="authentication"></span>

## Authentication
This boilerplate automatically implements the following authentication-related features.
- Login
- Register
- Forgot Password
- Email Verification

With NextJS's folder-based routing system, you can find all of this implemented logic in the `src/app/[locale]` directory. Furthermore, there is a utility to guard routes with "middleware", called `authMiddleware`, that can be found in `src/lib/server/authMiddleware.ts`. This utility is meant to be ran in server components to provide an optimal experience for your users. The best location to use it is within a `layout.tsx` file located in the folder you want to protect. As an example, the `src/app/[locale]/(auth)/layout.tsx` file implements the `auth` middleware. This means that all pages in this same directory or in a nested directory will require a user to be logged in to access them. Otherwise, they'll be redirected to the `/login` page. The following examples show each middleware available to you.

- `auth`

  This middleware can be applied to pages that require a user to be authenticated. A user that is not authenticated will be redirected to the `/login` page.
  ```tsx
    export default async function Layout({
      children,
    }: Readonly<{ children: ReactNode }>) {
      await authMiddleware(['auth']);

      return <Box>{children}</Box>;
    }
  ```
- `guest`

  This middleware can be applied to pages that require a user to not be authenticated. A user that is authenticated will be redirected to the `/dashboard` page.
  ```tsx
    export default async function Layout({
      children,
    }: Readonly<{ children: ReactNode }>) {
      await authMiddleware(['guest']);

      return <Box>{children}</Box>;
    }
  ```
- `verified`

  This middleware can be applied to pages that require a user to have verified their email. A user that has not been verified will be redirected to the `/verify-email` page.
  ```tsx
    export default async function Layout({
      children,
    }: Readonly<{ children: ReactNode }>) {
      await authMiddleware(['verified']);

      return <Box>{children}</Box>;
    }
  ```
- `unverified`

  This middleware can be applied to pages that require a user to not have verified their email yet. A user who has already verified their email will be redirected to the `/dashboard` page.
  ```tsx
    export default async function Layout({
      children,
    }: Readonly<{ children: ReactNode }>) {
      await authMiddleware(['unverified']);

      return <Box>{children}</Box>;
    }
  ```

To get access to the current user, you can use the `useAuth` hook exposed from the `src/providers/AuthProvider.tsx` file. It can be used in any component, thus allowing you to access and set the current user on any page.
```tsx
  export function AppToolbar() {
    const [user, setUser] = useAuth();

    return <Box>{user.name}</Box>;
  }
```

<span id="utilities"></span>

## API Utilities

### clientFetch
`clientFetch` is a pre-configured `fetch` wrapper that can communicate exclusively with your back-end API. Furthermore, it will automatically handle fetching and sending CSRF tokens needed for making requests to modify resources through your API. It can be found in the `src/lib/client/clientFetch.ts` file.

### useFetch
`useFetch` is similar to `clientFetch`, but it offers additional utilities specifically designed for submitting data to your server.
```tsx
  const [creds, setCreds] = useState<LoginCredentials>({
    email: '',
    password: '',
    remember: false,
  });

  const {
    $fetch: login,
    errors,
    inProgress,
    succeeded,
  } = useFetch<void, LoginCredentials>({
    path: '/login',
    init: {
      body: creds,
    },
    onSuccess: async () => {
      const response = await clientFetch<User>('/api/user');
      setUser(response);
      router.refresh();
    },
  });
```
In the example above, you can see that `useFetch` provides the following functionalities:
- Automatically gives you access to any validation errors resulting from your API call through the `errors` variable.
- Indicates whether the API call is still processing through the `inProgress` variable.
- Provides a way to inform the user when the API call was successful through the `succeeded` variable.

Additionally, the `$fetch` function is available to perform the API call to the path configured in the `useFetch` parameters.

### serverFetch
`serverFetch` is also like `clientFetch`, except it has been configured for running on server components. It will utilize the same cookies needed for Laravel Sanctum's authentication, and will respond in the same manner as `clientFetch`. It can be found in `src/lib/server/serverFetch.ts`.

<span id="linting"></span>

## ESLint & Prettier
What I would consider a "must-have" for any development experience, this boilerplate has a very robust and extensive set of configuration files for formatting and linting your JavaScript, TypeScript, & TSX files. Each rule has been carefully selected to provide an enjoyable development experience when building your application.

### Configuration
You can find all of the ESLint rules enabled for your application in the `.eslintrc.cjs` file. Here, you will find rules for:
- Formatting through [Prettier](https://prettier.io)
- TypeScript
- React

The `Prettier` configuration can be found in the `.prettierrc.json` file.

### VS Code Integration
To properly utilize ESLint in your VS Code development environment, I'd highly encourage you to use the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension. However, if you installed your application using AppIgnition, this extension will automatically be available to you in the NodeJS workspace container.

<span id="internationalization"></span>

## Internationalization
Since it's always best to tackle this problem when first creating your application, the [next-intl](https://next-intl-docs.vercel.app/) plugin has already been installed. The default locale has been set to English, and the language files are loaded from the `messages` directory. You can configure more locales in the `src/i18n.ts` file:
```ts
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const LOCALES = [
  'en',
  // More locales can go here. Just be sure a corresponding file exists
  // in the "messages" directory.
];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!LOCALES.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

You may have noticed that there's a folder `[locale]` in the `src/app` directory that contains all of your other pages. This is required so that the internationalization plugin can handle displaying your app in different languages based on the path. For instance, navigating to `/en/login` will display the English translations, while `/fr/login` would should French translations. French does not exist as a configured locale yet, but to add it to your application:

1. Add a new item to the `LOCALES` array in your `src/i18n.ts` configuration:
    ```ts
    export const LOCALES = [
      'en',
      'fr',
    ];
    ```
2. Create a corresponding language file under the `messages` directory. In the exmaple above, it would be named `messages/fr.json`. You can copy the structure from `messages/en.json` to get you started.

English is configured as the default locale, meaning you don't need to prefix your paths with `/en` to see English translations.

<span id="ci"></span>

## Continuous Integration
A [GitHub workflow](https://docs.github.com/en/actions/using-workflows/about-workflows) and [CircleCI](https://circleci.com/docs/about-circleci/) configuration has been included with this boilerplate. It performs the following tasks:
1. Installs your NPM dependencies
2. Runs ESLint
3. Builds your app to verify it's ready for production

You can edit these configurations as needed in the `.github/workflows/ci.yml` or `.circleci/config.yml` files.

<span id="seo"></span>

## SEO
You can modify your `robots.txt` and `sitemap.xml` files in the `src/app/robots.ts` and `src/app/sitemap.ts` files respectively. To learn more about their configuration options, you can read the following NextJS documentation:
- [robots.txt](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [sitemap.xml](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)

To configure the metadata on your pages, NextJS offers a simple and convenient way to do that [directly in your page's component](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).