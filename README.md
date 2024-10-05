# KeyEasy 🎹

A new way to learn your scales on piano, but make it a game! Compete with your friends
and its cheaper too. No physical piano needed!

![Key Easy in Action](https://github.com/user-attachments/assets/bdf6c56a-851c-4ae4-aa06-abd4d3f6a480)

# Motivation 🫡

I wanted to learn scales on piano, but I couldn't always play because I was in a house with 3 roomates. Either they were sleeping, or making lots of noise...
and when learning scales its hard to visualize their shape and patterns in my head, so I decided to make KeyEasy.
A web app that has you click through the scale in the right order, offering visual and audio feedback that helps make those neural connections.

# Quick Start 🚀

Try it [here!](https://keyeasy.netlify.app)

# Technologies and Packages Used

- [TypeScript](https://www.typescriptlang.org/) The whole app, front to back, is written in TypeScript and it really made me appreciate how much simpler it makes JS feel because of its strongly typed nature.

- [React](https://react.dev/) the frontend framework we know and love. I kept it mostly vanilla, but when managing my complex state for the game I turned to Redux.

- [Redux](https://redux.js.org/) was used to help manage the complicated game state, as well as the auth states. I initially went with React's built in Context API, but half way through development realized that my complex state would benefit from redux's state manipulation to make the code much cleaner, since my current Scale and current Note states were heavily intertwined with complex logic around them.

- [NextJS](https://nextjs.org/) was instrumental in my backend component of this app, (storing scores, users, and more) and it's built in routing allowed me to take KeyEasy from a simple SPA to a dynamic full-stack web application.

- [Jest](https://jestjs.io/) we can't forget about testing... Jest was instrumental to make sure my code was always functional when making big changes, and its easy to read and apply syntax made writing tests easy.

- [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/) keeps the code style consistent accross the board. Helpful if I collaborate with others in the future aswell.

- [Husky](https://github.com/typicode/husky) Automation on Git commit, automatically lints code, commit messages, and other git hooks to make sure a commit doesn't go out without meeting quality requirments.

- [Tailwind](https://tailwindcss.com/) I'm a developer not a designer, so having quick out of the box styles from Tailwind, let me focus on the app itself, and less time dealing with styling and CSS, but it still looks pretty.

- [Tonaljs](https://github.com/tonaljs/tonal) is a functional JS library, built with the purpose of bringing music theory to code. I used it to manipulate musical elements like notes, scales, and chords. All in abstractions (no music or sounds produced). While implementing it, I even made a few PRs of my own to help improve the usability of Tonal for everyone.
