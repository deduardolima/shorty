import { CACHE_MANAGER, Controller, Get, Inject, Param, Res } from "@nestjs/common";
import { Cache } from "cache-manager";
import { ShortyBusiness } from "./app/modules/shorty/shorty.business";


@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private shortyBusiness: ShortyBusiness,
  ) { }

  @Get(':shorty')
  async redirect(@Res() res: any, @Param('shorty') shortcut: string) {
    //redis
    const cacheKey = `shorty_${shortcut}`

    const cachedData = await this.cacheManager.get(cacheKey);    

    if (cachedData) {
      await this.shortyBusiness.registerClick(shortcut)
      return res.status(301).redirect(cachedData)
    }
    const linkFromDB = await this.shortyBusiness.getFindByShortcut(shortcut);
    await this.cacheManager.set(cacheKey, linkFromDB, 60 * 60 * 24 * 180);

    return res.status(301).redirect(linkFromDB)

  }

}