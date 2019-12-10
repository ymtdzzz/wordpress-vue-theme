<template>
    <div class="card-container">
        <router-link :to="post.slug" class="card-link"></router-link>
        <div class="post-card">
            <div class="post-card-header" :style="{ backgroundImage: 'url(' + post.thumbnail_url + ')' }">
                <div class="post-card-tags">
                    <a v-for="tag_name in post.tag_names" class="tag">#{{ tag_name }}</a>
                </div>
                <div class="post-card-title">{{ post.title.rendered }}</div>
                <div class="post-card-sub">{{ post.date | moment }}</div>
                <div class="post-card-category">
                    <a v-if="category_name" href="#"><v-fa icon="folder"/>  {{ category_name }}</a>
                </div>
            </div>
            <div class="post-card-feature">
                {{ post.content.rendered | striphtml }}
            </div>
<!--                <div class="bottom-row">-->
<!--                    <div class="pxc-info">-->
<!--                        aaaaaa-->
<!--                    </div>-->
<!--                    <div class="links"><a class="site" uk-tooltip="WEBSITE"><i class="fas fa-globe-americas"> </i></a><a class="link discordLink" uk-tooltip="DISCORD SERVER"><i class="fab fa-discord"></i></a><a class="shop" uk-tooltip="EXCLUSIVE POLLUX SHOP"><i class="fas fa-shopping-bag"> </i></a></div>-->
<!--                </div>-->
        </div>
    </div>
</template>

<script>
    export default {
        props: ['post'],
        computed: {
            category_name: function () {
                return _.get(this.post, '_embedded.wp:term.0.0.name', false)
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>