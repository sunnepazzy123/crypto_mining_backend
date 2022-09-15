import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { UsersService } from "src/users/users.service";
import { VaultService } from "src/vault/vault.service";


@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {

    constructor(
        private userService: UsersService,
        private vaultService: VaultService
        ) {

    }

    async use(req: Request, res: Response, next: NextFunction) {
        //@ts-ignore
        const { id } = req.user || {}
        //@ts-ignore
        console.log(await this.vaultService.decodeToken(req.session.user), "rere")
        if(id) {
            const user = await this.userService.findOne(id)
        //@ts-ignore
            req.user = user;
        //@ts-ignore
            req.session['user'] = this.vaultService.generateToken(user)
        }
        next()
    }
}