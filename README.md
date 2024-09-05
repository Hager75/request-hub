
# RequestHub

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.2.

# Overview

This Angular application is designed to manage and display user requests. It provides functionalities for listing, sorting, and updating request statuses, along with integrating reCAPTCHA for form submission verification.

# Features

- **Request List Display:** View and sort user requests.
- **Loading State:** Loader displayed while fetching data.
- **Request Status Update:** Update the status of requests.
- **Form Validation:** Includes client-side validation and reCAPTCHA for submissions.

## Data Handling and API Simulation

This project uses a **dummy API** to simulate HTTP requests. The requests and responses are handled as follows:

- **Static Array**: Initially, the request data is read from a static array (`STATIC_REQUESTS`) to simulate existing user requests.
- **Local Storage**: When a user adds a new request, the data is stored in the browser's local storage.
- **Fetching Data**: On subsequent visits or page reloads, the app fetches the saved requests from local storage. If no requests are found in local storage, it defaults back to the static array.

This approach allows for basic CRUD operations to be tested without the need for an actual backend API.


## Technologies Used

- **Angular 18:** Framework for building the application.
- **RxJS:** For handling asynchronous data streams.
- **Flowbite:**  UI component library.
- **ngx-toastr:** For toast notifications.
- **ng-recaptcha-2:** Google reCAPTCHA v2 integration.
- **Tailwind CSS:** Styling framework.

## Installation

To set up the project locally:

- **Clone the repository:**

   ```bash
   git clone https://github.com/Hager75/request-hub.git

- **Navigate to the project directory:**
    ```bash
    cd request-hub
    ```

- **Install the dependencies:**
    ```bash
    npm install
    ```




## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## User Authentication

To test or demonstrate user authentication, use the following credentials:

- **Username:** `emilys`
- **Password:** `emilyspass`

### Steps to authenticate:

- Navigate to the login page.

- Enter the credentials provided above.
- Click the **"Login"** button to authenticate.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


