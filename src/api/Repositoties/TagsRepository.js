import Repository from "../Repository"
import _ from 'lodash'

const resource = "/tags"
export default {
    // getTags(limit, callback) {
    //     if (_.isEmpty(limit)) {
    //         let limit = 5
    //     }
    //     return Repository.get(
    //         `${resource}?per_page=${limit}`
    //     )
    //         .then(response => {
    //             callback(response.data)
    //         })
    //         .catch(e => {
    //             callback(e)
    //         })
    // },
    getPostById(id, callback) {
        if (_.isEmpty(id)) {
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
