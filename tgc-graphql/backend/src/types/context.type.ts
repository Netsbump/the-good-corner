import type { Request, Response } from 'express'
import type Cookies from 'cookies'

export interface Context {
  req: Request
  res: Response
  cookies: Cookies
} 