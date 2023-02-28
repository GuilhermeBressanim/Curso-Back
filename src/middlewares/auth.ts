import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { UserInstance } from '../models/User'
import { jwtService } from '../services/jwtService'
import { userService } from '../services/userSerice'

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' })
    }

    const token = authorizationHeader.replace(/Bearer /, '')

    jwtService.verifyToken(token, (err, decoded) => {
        console.log(decoded?.valueOf())
        if (err || typeof decoded === 'undefined') {
            return res.status(401).json({ message: 'Não autorizado: token inválido' })
        }


        userService.findByEmail((decoded as JwtPayload).email).then(user => {
            req.user = user
            next()
        })
    })
}