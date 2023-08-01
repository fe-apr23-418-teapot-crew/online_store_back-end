'use strict';

import express from 'express';
import { publicController } from '../controllers/Public.controllers';

const router = express.Router();

router.get('/:category/:model/:color/:photoName', publicController.getImage);

export default router;
