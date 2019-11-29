import PostsRepository from "./Repositoties/PostsRepository";

const repositories = {
	posts: PostsRepository,
}

export const RepositoryFactory = {
	get: name => repositories[name]
}
