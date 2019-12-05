<template>
    <div v-if="isOpen" class="comments-container">
        <h1 class="comments-header">Comments</h1>
        {{comments}}
        <div class="comment-container" v-for="comment in comments">
            <div class="comment-header">
                <a class="author-info" v-if="!_.isEmpty(comment.author_url)" :href="comment.author_url">{{ comment.author_name }}</a>
                <span class="author-info" v-else>{{ comment.author_name }}</span>
            </div>
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
    }
</style>