import Article from '../classes/Articles';
import { IObject } from '../types';
import { error, success } from '../utils/functions';
import { Readable } from 'stream';
const Articles = new Article();

export function getAllArticles(req: IObject, res: IObject): void {
  if (req.query.category) {
    Articles.getAllByCategory(req.query.category)
      .then((result: any) => res.status(200).json(success(result)))
      .catch((err: Error) => res.status(500).json(error(err.message)));
  } else {
    Articles.getAll()
      .then((result: any) => res.status(200).json(success(result)))
      .catch((err: Error) => res.status(500).json(error(err.message)));
  }
}
export function add(req: IObject, res: IObject): void {
  Articles.add(
    req.body.name,
    req.body.path,
    req.body.main_category,
    req.body.sub_category,
    req.body.description,
    req.body.content_markdown,
    req.body.content_html,
    req.cookies.user_id,
  )
    .then(a => res.status(201).json(success(a)))
    .catch(err => res.status(500).json(error(err.message)));
}

export function updateArticle(req: IObject, res: IObject) {
  Articles.put(
    req.params.id,
    req.body.name,
    req.body.description,
    req.body.path,
    req.body.main_category,
    req.body.sub_category,
    req.body.content_markdown,
    req.body.content_html,
  )
    .then(() => res.status(201).json(success('success')))
    .catch(err => res.status(500).json(error(err.message)));
}

export function deleteArticle(req: IObject, res: IObject) {
  Articles.delete(req.params.id)
    .then(() => res.status(201).json(success('success')))
    .catch((err: Error) => res.status(500).json(error(err.message)));
}
