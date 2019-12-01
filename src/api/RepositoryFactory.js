import PostsRepository from "./Repositoties/PostsRepository"
import TagsRepository from "./Repositoties/TagsRepository";

const repositories = {
	posts: PostsRepository,
	tags: TagsRepository,
}

export const RepositoryFactory = {
	get: name => repositories[name]
}
