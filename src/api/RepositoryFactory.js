import PostsRepository from "./Repositoties/PostsRepository"
import TagsRepository from "./Repositoties/TagsRepository"
import UsersRepository from "./Repositoties/UsersRepository"

const repositories = {
	posts: PostsRepository,
	tags: TagsRepository,
	users: UsersRepository,
}

export const RepositoryFactory = {
	get: name => repositories[name]
}
