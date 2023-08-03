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
4. Start the server: `npm run dev`

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

<table>
    <tr>
        <th>
        	Method
        </th>
        <th>
        	Endpoint
        </th>
        <th>
        	Description
        </th>
    </tr>
    	<tr>
        <th colspan="3">Products</th>
    	</tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
        	<a href="https://four18-teapot-crew-dev.onrender.com/products">
        		/products
          </a>
        </td>
        <td>
        	Get an object with count and rows containing a list of all products.
        </td>
    </tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
        	<a href="https://four18-teapot-crew-dev.onrender.com/products/new">
        		/products/new
          </a>
        </td>
        <td>
        	Get an object with count and rows containing a list of the <strong>15 newest phones</strong> sorted by price ascending
        </td>
    </tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
        	<a href="https://four18-teapot-crew-dev.onrender.com/products/discount">
        		/products/discount
          </a>
        </td>
        <td>
        	Get an object with count and rows containing a list of the <strong>15 more discounting price phones</strong> sorted by discount descending
        </td>
    </tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
          <a href="https://four18-teapot-crew-dev.onrender.com/products/1">
            /products/1
          </a>
        </td>
        <td>
        	Get information about a specific product.
        </td>
    </tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
          <a href="https://four18-teapot-crew-dev.onrender.com/products/1/recommended">
          	/products/1/recommended
          </a>
        </td>
        <td>
        	Get an object with count and rows containing a list of all products that belong to the same category as the product with ID 1, randomly sorted.
        </td>
    </tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
          <a href="https://four18-teapot-crew-dev.onrender.com/products?limit=2&offset=10&sortBy=price">
          	/products?limit=2&offset=10&sortBy=price
          </a>
        </td>
        <td>
        	Get a paginated list of products with sorting. Available sorting:
            <br> - <strong>id</strong> = default sorting;
            <br> - <strong>new</strong> = sorting by year and sorted by price ascending;
            <br> - <strong>random</strong> = randomly sorting;
            <br> - <strong>discount</strong> = sorting from biggest discount to lower;
            <br> - <strong>price</strong> = sorting from lower price to bigger;
        </td>
    </tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
          <a href="https://four18-teapot-crew-dev.onrender.com/products?productType=phones">
          	/products?productType=phones
          </a>
        </td>
        <td>
        	Get a filtered list of products by category, otherwise, if the category is not available get an empty array. Available category:
            <br> - <strong>phones</strong>;
            <br> - <strong>tablets</strong>;
            <br> - <strong>accessories</strong>;
        </td>
    </tr>
    	<tr>
        	<th colspan="3">Phones</th>
    	</tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
          <a href="https://four18-teapot-crew-dev.onrender.com/phones">
          	/phones
          </a>
        </td>
        <td>
        	Get an object with count and rows containing a list of all phones with advanced information.
        </td>
    </tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
          <a href="https://four18-teapot-crew-dev.onrender.com/phones/apple-iphone-11-128gb-green">
          	/phones/apple-iphone-11-128gb-green
          </a>
        </td>
        <td>
        	Get information about a specific phone.
        </td>
    </tr>
    	<tr>
        <th colspan="3">Tablets</th>
    	</tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
          <a href="https://four18-teapot-crew-dev.onrender.com/tablets">
          	/tablets
          </a>
        </td>
        <td>
        	Get an object with count and rows containing a list of all tablets with advanced information.
        </td>
    </tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
          <a href="https://four18-teapot-crew-dev.onrender.com/tablets/apple-ipad-pro-11-2021-256gb-spacegray">
          	/tablets/apple-ipad-pro-11-2021-256gb-spacegray
          </a>
        </td>
        <td>
        	Get information about a specific tablet.
        </td>
    </tr>
    	<tr>
        <th colspan="3">Accessories</th>
    	</tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
          <a href="https://four18-teapot-crew-dev.onrender.com/accessories">
          	/accessories
          </a>
        </td>
        <td>
        	Get an object with count and rows containing a list of all accessories with advanced information.
        </td>
    </tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
          <a href="https://four18-teapot-crew-dev.onrender.com/accessories/apple-watch-series-3-38mm-gold">
          	/accessories/apple-watch-series-3-38mm-gold
          </a>
        </td>
        <td>
        	Get information about a specific accessory.
        </td>
    </tr>
    	<tr>
        <th colspan="3">Images</th>
    	</tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
          <a href="https://four18-teapot-crew-dev.onrender.com/img/phones/apple-iphone-7/black/00.webp">
          	/img/phones/apple-iphone-7/black/00.webp
          </a>
        </td>
        <td>
        	Get the photo of a specific product.
        </td>
    </tr>
</table>
