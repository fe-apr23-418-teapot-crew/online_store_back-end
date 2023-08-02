# [Online-store-API](https://four18-teapot-crew-dev.onrender.com/)

## Description

This repository contains the source code for the Online-Store-API project, which serves as the backend for the online store website. The API is built using **_Node.js_** and **_Express.js_**, and it interacts with a **_PostgreSQL_** database using the **_Sequelize ORM_**.

## Features

The Online Store API provides the following features:

- Product Endpoints: Endpoints to retrieve information about products, including getting all products, getting a single product by ID.
- Pagination: Support for paginated results when fetching multiple products.
- Image Upload: Endpoints to upload product images and serve them to the frontend.

## Usage

Feel free to customize the content, styles, and functionality of the Online-store-API to suit your needs. You can modify the existing code or add new features as required.

## Acknowledgements

- JavaScript
- TypeScript
- node.js
- express
- sequelize
- [render.com](https://render.com/) for hosting the live demo

## Getting Started

To get started with the Online-Store-API, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/online_store_back-end.git`
2. Install dependencies: `npm install`
3. Set up the PostgreSQL database and configure the connection in the **.env** file.
4. Run the database migrations: `npx sequelize-cli db:migrate`
5. Seed the database with initial data (optional): `npx sequelize-cli db:seed:all`
6. Start the server: `npm run dev`

## Contributing

If you would like to contribute to this project, you can follow these steps:

1. Fork the repository.
2. Clone the forked repository: `git clone https://github.com/your-username/online_store_back-end.git`
3. Navigate to the project directory: `cd online_store_back-end`
4. Create a new branch: `git switch -c feature/your-feature`
5. Install dependencies: `npm install`
6. Make your changes and test them locally.
7. Commit your changes: `git commit -m 'Add some feature'`
8. Push the branch to your forked repository: `git push origin feature/your-feature`
9. Open a pull request in this repository.

## Endpoints

The base URL for the API is: **[https://four18-teapot-crew-dev.onrender.com/](https://four18-teapot-crew-dev.onrender.com/)**

| Method | Endpoint                                                                                                                                      | Description                                                                                                                                     |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | [/products](https://four18-teapot-crew-dev.onrender.com/products)                                                                             | Get an object with count and rows containing list of all products.                                                                              |
| GET    | [/products/1](https://four18-teapot-crew-dev.onrender.com/products/1)                                                                         | Get information about a specific product.                                                                                                       |
| GET    | [/products/1/recommended](https://four18-teapot-crew-dev.onrender.com/products/1/recommended)                                                 | Get an object with count and rows containing a list of all products that belong to the same category as the product with ID 1, randomly sorted. |
| GET    | [/products?limit=2&offset=10&sortBy=price](https://four18-teapot-crew-dev.onrender.com/products?limit=2&offset=10&sortBy=price)               | Get a paginated list of products.                                                                                                               |
| GET    | [/phones](https://four18-teapot-crew-dev.onrender.com/phones)                                                                                 | Get an object with count and rows containing list of all phones.                                                                                |
| GET    | [/phones/apple-iphone-11-128gb-green](https://four18-teapot-crew-dev.onrender.com/phones/apple-iphone-11-128gb-green)                         | Get information about a specific phone.                                                                                                         |
| GET    | [/tablets](https://four18-teapot-crew-dev.onrender.com/tablets)                                                                               | Get an object with count and rows containing list of all tablets.                                                                               |
| GET    | [/tablets/apple-ipad-pro-11-2021-256gb-spacegray](https://four18-teapot-crew-dev.onrender.com/tablets/apple-ipad-pro-11-2021-256gb-spacegray) | Get information about a specific tablet.                                                                                                        |
| GET    | [/accessories](https://four18-teapot-crew-dev.onrender.com/accessories)                                                                       | Get an object with count and rows containing list of all accessories.                                                                           |
| GET    | [/accessories/apple-watch-series-3-38mm-gold](https://four18-teapot-crew-dev.onrender.com/accessories/apple-watch-series-3-38mm-gold)         | Get information about a specific accessories.                                                                                                   |
| GET    | [/img/phones/apple-iphone-7/black/00.webp](https://four18-teapot-crew-dev.onrender.com/img/phones/apple-iphone-7/black/00.webp)               | Get the photo of a specific product.                                                                                                            |
