<template>
    <div v-if="isOpen" class="comments-container">
        <h1 class="comments-header">Comments</h1>
        <div class="comment-container" v-for="comment in comments">
            <div class="comment-header">
                <a class="author-name" v-if="!(comment.author_url === '')" :href="comment.author_url">{{ comment.author_name }}</a>
                <span class="author-name" v-else>{{ comment.author_name }}</span>
                <span class="comment-date"> | {{ comment.date | moment }}</span>
            </div>
            <div class="comment-content" v-html="comment.content.rendered"></div>
        </div>
      <transition name="slide-fade" mode="out-in">
        <div v-if="isCommentable && !isPosting" class="post-comment-container">
          <input type="text" v-model="name" placeholder="（必須）NAME">
          <p class="error" v-if="errors.name.required">名前は必須項目です。</p>
          <input type="email" v-model="email" placeholder="（必須）EMAIL(非公開)">
          <p class="error" v-if="errors.email.required">メールアドレスは必須項目です。</p>
          <input type="url" v-model="site" placeholder="（任意）ホームページURL">
          <textarea v-model="content" placeholder="（必須）コメント本文"></textarea>
          <p class="error" v-if="errors.content.required">コメント内容は必須項目です。</p>
          <button @click="postComment">送信</button>
        </div>
        <div v-if="!isCommentable" class="post-comment-container">コメントは閉鎖されています。</div>
        <loader v-if="isPosting" />
      </transition>
    </div>
</template>

<script>
    import _ from 'lodash'
    import Constants from "../../Constants"
    import axios from 'axios'
    import Loader from './Loader'
    import router from "../../router"

    export default {
        data() {
            return {
                name: '',
                email: '',
                site: '',
                content: '',
                isPosting: false,
                defaultErrors: {
                    name: {
                        required: false
                    },
                    email: {
                        required: false
                    },
                    content: {
                        required: false
                    }
                },
                errors: {
                    name: {
                        required: false
                    },
                    email: {
                        required: false
                    },
                    content: {
                        required: false
                    }
                }
            }
        },
        props: [
            'isOpen',
            'comments',
            'postId',
            'commentStatus'
        ],
        computed: {
            isCommentable: function () {
                return this.commentStatus === 'open'
            }
        },
        components: {
            Loader
        },
        methods: {
            postComment: function () {
                if (this.checkForm()) {
                    this.isPosting = true
                    axios.post(Constants.DEV_DOMAIN + '/wp-json/wp/v2/comments', {
                        author_name: this.name,
                        author_email: this.email,
                        content: this.content,
                        post: this.postId
                    }).then(response => {
                        router.go(0)
                    }).catch(e => {
                        alert('ng' + e)
                    }).finally(() => {
                        this.isPosting = false
                        this.name = ''
                        this.email = ''
                        this.content = ''
                    })
                }
            },
            checkForm: function () {
                let hasError = false
                this.errors = this.defaultErrors
                if (!this.name) {
                    this.errors.name.required = true
                    hasError = true
                } else {
                    this.errors.name.required = false
                }
                if (!this.email) {
                    this.errors.email.required = true
                    hasError = true
                } else {
                    this.errors.email.required = false
                }
                if (!this.content) {
                    this.errors.content.required = true
                    hasError = true
                } else {
                    this.errors.content.required = false
                }
                return !hasError
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
