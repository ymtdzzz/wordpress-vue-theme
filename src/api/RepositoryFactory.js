import PostsRepository from "./Repositoties/PostsRepository"
import TagsRepository from "./Repositoties/TagsRepository"
import UsersRepository from "./Repositoties/UsersRepository"
import MenusRepository from "./Repositoties/MenusRepository"
import PagesRepository from "./Repositoties/PagesRepository"
import SiteRepository from "./Repositoties/SiteRepository"

const repositories = {
	posts: PostsRepository,
	tags: TagsRepository,
	users: UsersRepository,
	menus: MenusRepository,
	pages: PagesRepository,
	site: SiteRepository,
}

export const RepositoryFactory = {
	get: name => repositories[name]
}
