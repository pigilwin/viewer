# Solitaire

![image of game screen](./images/screenshot.png "What the game looks like")

A simple solitaire implementation in [React](https://reactjs.org/) for UI, [Redux](https://redux-toolkit.js.org/) for the state management, [Tailwindcss](https://tailwindcss.com/) for easy UI development and [Typescript](https://www.typescriptlang.org/) for sanity when working with the web.

## Information

This implementation has drag and drop or double click functionality to move the cards. When a game is complete and won, the moves and score can be saved to a client side stored database within [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

This project has been developed using NPM but yarn will also work. This README file contains commands in NPM but the yarn equivalent will also work.

## The easiest way to run this application

The simplest way to have this application running is by using `docker`:

Just type `docker compose up development`

## Installing the project locally

To install the project locally just clone the repository and run the command:

```bash
npm install
```

## Developing the project on your local environment

The project can be developed locally by running one command

```bash
npm start
```

This command will spin up your local dev server and allow you to access the application on the url provided.
