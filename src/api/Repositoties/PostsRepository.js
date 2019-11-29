import Repository from "../Repository";

const rresource = "/posts"
export default {
	get() {
		return Repository.get(`${rresource}`)
	},
}
