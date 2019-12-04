import Repository from "../Repository"
import _ from 'lodash'

const resource = "/categories"
export default {
    getCategoryIdBySlug(slug, callback) {
        if (_.isEmpty(slug)) {
            // 全件取得防止
            return {}
        }
        return Repository.get(
            `${resource}?slug=${slug}`
        )
            .then(response => {
                callback(_.get(response, 'data.0.id'))
            })
            .catch(e => {
                callback(e)
            })
    }
}
