import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { login } from './controllers'

const router = new Router()

router.post('/login',
  body({
    email: {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }),
  login)

export default router;
