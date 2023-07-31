'use strict';

import express from 'express';
const router = express.Router();

const products = [
  {
    'id': 1,
    'category': 'phones',
    'itemId': 'apple-iphone-7-32gb-black',
    'name': 'Apple iPhone 7 32GB Black',
    'fullPrice': 400,
    'price': 375,
    'screen': '4.7" IPS',
    'capacity': '32GB',
    'color': 'black',
    'ram': '2GB',
    'year': 2016,
    'image': 'img/phones/apple-iphone-7/black/00.webp'
  },
  {
    'id': 2,
    'category': 'phones',
    'itemId': 'apple-iphone-7-plus-32gb-black',
    'name': 'Apple iPhone 7 Plus 32GB Black',
    'fullPrice': 540,
    'price': 500,
    'screen': '5.5" IPS',
    'capacity': '32GB',
    'color': 'black',
    'ram': '3GB',
    'year': 2016,
    'image': 'img/phones/apple-iphone-7-plus/black/00.webp'
  },
  {
    'id': 3,
    'category': 'phones',
    'itemId': 'apple-iphone-8-64gb-gold',
    'name': 'Apple iPhone 8 64GB Gold',
    'fullPrice': 600,
    'price': 550,
    'screen': '4.7" IPS',
    'capacity': '64GB',
    'color': 'gold',
    'ram': '2GB',
    'year': 2017,
    'image': 'img/phones/apple-iphone-8/gold/00.webp'
  },
  {
    'id': 4,
    'category': 'phones',
    'itemId': 'apple-iphone-11-64gb-black',
    'name': 'Apple iPhone 11 64GB Black',
    'fullPrice': 932,
    'price': 880,
    'screen': '6.1" IPS',
    'capacity': '64GB',
    'color': 'black',
    'ram': '4GB',
    'year': 2019,
    'image': 'img/phones/apple-iphone-11/black/00.webp'
  },
  {
    'id': 5,
    'category': 'phones',
    'itemId': 'apple-iphone-11-128gb-yellow',
    'name': 'Apple iPhone 11 128GB Yellow',
    'fullPrice': 1100,
    'price': 1050,
    'screen': '6.1" IPS',
    'capacity': '128GB',
    'color': 'yellow',
    'ram': '4GB',
    'year': 2019,
    'image': 'img/phones/apple-iphone-11/yellow/00.webp'
  },
  {
    'id': 6,
    'category': 'phones',
    'itemId': 'apple-iphone-11-256gb-green',
    'name': 'Apple iPhone 11 256GB Green',
    'fullPrice': 1172,
    'price': 1115,
    'screen': '6.1" IPS',
    'capacity': '256GB',
    'color': 'green',
    'ram': '4GB',
    'year': 2019,
    'image': 'img/phones/apple-iphone-11/green/00.webp'
  },
  {
    'id': 7,
    'category': 'phones',
    'itemId': 'apple-iphone-11-pro-64gb-gold',
    'name': 'Apple iPhone 11 Pro 64GB Gold',
    'fullPrice': 1312,
    'price': 1270,
    'screen': '5.8" OLED',
    'capacity': '64GB',
    'color': 'gold',
    'ram': '4GB',
    'year': 2019,
    'image': 'img/phones/apple-iphone-11-pro/gold/00.webp'
  },
  {
    'id': 8,
    'category': 'phones',
    'itemId': 'apple-iphone-11-pro-256gb-midnightgreen',
    'name': 'Apple iPhone 11 Pro 256GB Midnight green',
    'fullPrice': 1640,
    'price': 1570,
    'screen': '5.8" OLED',
    'capacity': '256GB',
    'color': 'midnightgreen',
    'ram': '4GB',
    'year': 2019,
    'image': 'img/phones/apple-iphone-11-pro/midnightgreen/00.webp'
  },
  {
    'id': 9,
    'category': 'phones',
    'itemId': 'apple-iphone-11-pro-512gb-silver',
    'name': 'Apple iPhone 11 Pro 512GB Silver',
    'fullPrice': 1880,
    'price': 1780,
    'screen': '5.8" OLED',
    'capacity': '512GB',
    'color': 'silver',
    'ram': '4GB',
    'year': 2019,
    'image': 'img/phones/apple-iphone-11-pro/silver/00.webp'
  },
  {
    'id': 10,
    'category': 'phones',
    'itemId': 'apple-iphone-11-pro-max-64gb-spacegray',
    'name': 'Apple iPhone 11 Pro Max 64GB Spacegray',
    'fullPrice': 1480,
    'price': 1400,
    'screen': '6.5" OLED',
    'capacity': '64GB',
    'color': 'spacegray',
    'ram': '4GB',
    'year': 2019,
    'image': 'img/phones/apple-iphone-11-pro-max/spacegray/00.webp'
  },
  {
    'id': 11,
    'category': 'phones',
    'itemId': 'apple-iphone-11-pro-max-256gb-gold',
    'name': 'Apple iPhone 11 Pro Max 256GB Gold',
    'fullPrice': 1776,
    'price': 1680,
    'screen': '6.5" OLED',
    'capacity': '256GB',
    'color': 'gold',
    'ram': '4GB',
    'year': 2019,
    'image': 'img/phones/apple-iphone-11-pro-max/gold/00.webp'
  },
  {
    'id': 12,
    'category': 'phones',
    'itemId': 'apple-iphone-11-pro-max-512gb-spacegray',
    'name': 'Apple iPhone 11 Pro Max 512GB Spacegray',
    'fullPrice': 2020,
    'price': 1930,
    'screen': '6.5" OLED',
    'capacity': '512GB',
    'color': 'spacegray',
    'ram': '4GB',
    'year': 2019,
    'image': 'img/phones/apple-iphone-11-pro-max/spacegray/00.webp'
  },
  {
    'id': 13,
    'category': 'phones',
    'itemId': 'apple-iphone-xr-64gb-red',
    'name': 'Apple iPhone XR 64GB Red',
    'fullPrice': 712,
    'price': 670,
    'screen': '6.1" IPS',
    'capacity': '64GB',
    'color': 'red',
    'ram': '3GB',
    'year': 2018,
    'image': 'img/phones/apple-iphone-xr/red/00.webp'
  },
  {
    'id': 14,
    'category': 'phones',
    'itemId': 'apple-iphone-xr-128gb-white',
    'name': 'Apple iPhone XR 128GB White',
    'fullPrice': 880,
    'price': 815,
    'screen': '6.1" IPS',
    'capacity': '128GB',
    'color': 'white',
    'ram': '3GB',
    'year': 2018,
    'image': 'img/phones/apple-iphone-xr/white/00.webp'
  },
  {
    'id': 15,
    'category': 'phones',
    'itemId': 'apple-iphone-xs-64gb-spacegray',
    'name': 'Apple iPhone XS 64GB Spacegray',
    'fullPrice': 760,
    'price': 720,
    'screen': '5.8" OLED',
    'capacity': '64GB',
    'color': 'spacegray',
    'ram': '4GB',
    'year': 2018,
    'image': 'img/phones/apple-iphone-xs/spacegray/00.webp'
  },
  {
    'id': 16,
    'category': 'phones',
    'itemId': 'apple-iphone-xs-max-64gb-gold',
    'name': 'Apple iPhone XS Max 64GB Gold',
    'fullPrice': 960,
    'price': 900,
    'screen': '6.5" OLED',
    'capacity': '64GB',
    'color': 'gold',
    'ram': '4GB',
    'year': 2018,
    'image': 'img/phones/apple-iphone-xs-max/gold/00.webp'
  },
  {
    'id': 17,
    'category': 'phones',
    'itemId': 'apple-iphone-xs-max-256gb-silver',
    'name': 'Apple iPhone XS Max 256GB Silver',
    'fullPrice': 1080,
    'price': 1000,
    'screen': '6.5" OLED',
    'capacity': '256GB',
    'color': 'silver',
    'ram': '4GB',
    'year': 2018,
    'image': 'img/phones/apple-iphone-xs-max/silver/00.webp'
  },
  {
    'id': 18,
    'category': 'phones',
    'itemId': 'apple-iphone-7-32gb-gold',
    'name': 'Apple iPhone 7 32GB Gold',
    'fullPrice': 400,
    'price': 375,
    'screen': '4.7" IPS',
    'capacity': '32GB',
    'color': 'gold',
    'ram': '2GB',
    'year': 2016,
    'image': 'img/phones/apple-iphone-7/gold/00.webp'
  },
  {
    'id': 19,
    'category': 'phones',
    'itemId': 'apple-iphone-7-plus-32gb-silver',
    'name': 'Apple iPhone 7 Plus 32GB Silver',
    'fullPrice': 540,
    'price': 500,
    'screen': '5.5" IPS',
    'capacity': '32GB',
    'color': 'silver',
    'ram': '3GB',
    'year': 2016,
    'image': 'img/phones/apple-iphone-7-plus/silver/00.webp'
  },
  {
    'id': 20,
    'category': 'phones',
    'itemId': 'apple-iphone-8-64gb-spacegray',
    'name': 'Apple iPhone 8 64GB Space Gray',
    'fullPrice': 600,
    'price': 550,
    'screen': '4.7" IPS',
    'capacity': '64GB',
    'color': 'spacegray',
    'ram': '2GB',
    'year': 2017,
    'image': 'img/phones/apple-iphone-8/spacegray/00.webp'
  }
];

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:productId', (req, res) => {
  const { productId } = req.params;
  const foundProduct = products.find(product => +product.id === +productId);

  if (!foundProduct) {
    res.sendStatus(404);

    return;
  }

  res.send(foundProduct);
});

export default router;