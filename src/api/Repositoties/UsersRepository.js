import Repository from "../Repository"
import _isNaN from 'lodash/isNaN'

const resource = "/users"
export default {
    getUserById(id, callback) {
        if (_isNaN(id)) {
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
