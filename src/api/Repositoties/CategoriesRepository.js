import Repository from "../Repository"
import _isEmpty from 'lodash/isEmpty'

const resource = "/categories"
export default {
    getCategoryBySlug(slug, callback) {
        if (_isEmpty(slug)) {
            // 全件取得防止
            return {}
        }
        return Repository.get(
            `${resource}?slug=${slug}`
        )
            .then(response => {
                callback(response.data)
            })
            .catch(e => {
                callback(e)
            })
    }
}
