import Repository from "../Repository"
import _ from 'lodash'

const resource = "/users"
export default {
    getUserById(id, callback) {
        if (_.isNaN(id)) {
            // 全件取得防止
            return {}
        }
        return Repository.get(
            `${resource}/${id}`
        )
            .then(response => {
                callback(response.data)
            })
            .catch(e => {
                callback(e)
            })
    }
}
