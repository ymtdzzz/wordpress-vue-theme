import PostsRepository from "./Repositoties/PostsRepository"
import TagsRepository from "./Repositoties/TagsRepository"
import UsersRepository from "./Repositoties/UsersRepository"
import MenusRepository from "./Repositoties/MenusRepository"

const repositories = {
	posts: PostsRepository,
	tags: TagsRepository,
	users: UsersRepository,
	menus: MenusRepository,
}

export const RepositoryFactory = {
	get: name => repositories[name]
}
