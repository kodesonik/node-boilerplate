import ejs from 'ejs'
import path from 'path'
import express from 'express'
import { 
  cors,
  jsonParser,
  contentType 
} from '../middlewares'

export default app => {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(jsonParser)
  app.use(contentType)
  app.use(express.static('public'))
  app.engine ('.html', ejs.renderFile);
  app.set ('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../../../views/'))
}
