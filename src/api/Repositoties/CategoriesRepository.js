import Repository from "../Repository"
import _ from 'lodash'

const resource = "/categories"
export default {
    getCategoryBySlug(slug, callback) {
        if (_.isEmpty(slug)) {
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
