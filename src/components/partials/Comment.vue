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
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        props: [
            'isOpen',
            'comments'
        ]
    }
</script>

<style lang="scss" scoped>
    .comments-container {
        width: 70%;
        margin: 20px auto;
        padding-bottom: 70px;

        .comments-header {
            font-size: 2.2rem;
        }

        .comment-container {
          margin-top: 20px;

          .comment-header {
            padding: 5px 10px;

            .author-name {
              font-size: 1.4rem;
            }

            .comment-date {
              color: #555;
            }
          }
        }

        .comment-content {
          margin-top: 12px;
          border: 1px solid black;
          border-radius: 7px;
          padding: 15px;
        }
    }
</style>
