import path from 'path'
import { readdirSync } from 'fs'
import { Router } from 'express'

const router = Router()
const routerPath = path.resolve('./src/routes')
const removeExtension = (fileName) => fileName.split('.').shift()

readdirSync(routerPath)
  .filter((fileName) => !fileName.includes('index'))
  .forEach((fileName) => {
    const cleanName = removeExtension(fileName)
    import(`./${cleanName}`).then((moduleRouter) => {
      console.log(`Route loaded: '/${cleanName}'`)
      router.use(`/${cleanName}`, moduleRouter.router)
    })
  })

export { router }
