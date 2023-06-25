> **Note**
> This project was developed as part of the Technoverse Hackathon
<p align="center">
  <img src="https://github.com/codedmachine111/bookmytaxpro/assets/88738817/d3ff43cd-85ea-4a2a-9034-a72f3b649a32" alt="coincontrol-banner" width="500">
</p>

[Live Demo](https://bookmytaxpro.vercel.app) | [Server Repository](https://github.com/codedmachine111/bmt-server)

# BookmyTaxpro

We streamline the process of finding and booking Chartered Accountants and Financial Experts by providing a user-friendly web application that enables users to easily search for financial services, select from a pool of expert CAs, and book consultations tailored to their specific needs.

## Features

- Booking Financial Services with Experts.
- AI-Powered Chatbot Integration.
- Manage Services.

## Built with
<p align="left">
   <img src="https://www.svgrepo.com/show/452092/react.svg" height="50px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img src="https://www.svgrepo.com/show/354118/nodejs.svg" height="50px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img src="https://www.svgrepo.com/show/374002/prisma.svg" height="50px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img src="https://pbs.twimg.com/profile_images/1504919223168077836/RSsCSpKf_400x400.jpg" height="50px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img src="https://www.svgrepo.com/show/349502/sass.svg" height="50px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

- [**React**](https://reactjs.org/): JavaScript library for building user interfaces.
- [**Node.js**](https://nodejs.org/): JavaScript runtime environment that allows executing JavaScript code outside of a web browser.
- [**Prisma**](https://www.prisma.io/): Modern, type-safe ORM for Node.js and TypeScript.
- [**Planetscale**](https://planetscale.com/): Highly scalable, globally distributed database.
- [**Sass**](https://sass-lang.com/): CSS extension language that provides more advanced features and capabilities.

## Installation steps

1. - Fork the [repo](https://github.com/codedmachine111/bookmytaxpro)
   - Clone the repo to your local machine `git clone https://github.com/codedmachine111/bookmytaxpro.git`
   - Change current directory `cd bookmytaxpro`
2. Install latest version of [Nodejs](https://nodejs.org/en/) and install all the dependencies using:

```bash
npm install
```

3. Generate prisma client

```bash
npx prisma generate
```

4. For using the chatbot, create a .env file in the root directory of the project and add:

```bash
REACT_APP_OPENAI_API_KEY = "YOUR-API-KEY"
```
> **Note**
> You need to get your OpenAI API key from ![here](https://platform.openai.com/)

5. Start the development server:

```bash
npm start
```

## Contribution

This project was developed as part of the ![Technoverse](https://gdscmbcet.notion.site/TechnoVerse-by-GDSC-MBCET-506c7e43bb904ecca901aa63c3702028) Hackathon. Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please submit a pull request or open an issue on the GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).
