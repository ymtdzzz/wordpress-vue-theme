<template>
    <div class="post">
        <div class="article-header-container">
            <transition name="slide-fade" mode="out-in">
                <div class="article-header-image" v-if="postLoaded" :style="{ backgroundImage: 'url(' + postToShow.thumbnail_url + ')' }">
                    <div class="article-sub">
                      {{ postToShow.date | moment }}
                    </div>
                    <div class="article-title">
                        {{ postToShow.title.rendered }}
                    </div>
                    <div class="article-tags">
                        <span v-for="(tag_name, tag_slug) in postToShow.tag_names">
                            <router-link class="tag" :to="{ name: 'Tag', params: { tag: tag_slug } }">
                                #{{ tag_name }}
                            </router-link>
                        </span>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="slide-fade" mode="out-in">
            <div v-show="postLoaded">
                <div class="article">
                    <div id="toc"></div>
                    <div class="article-main" v-html="postToShow.content.rendered"></div>
                </div>
            </div>
        </transition>
            <Loader v-show="!postLoaded"/>
        <related-posts v-if="postLoaded" :post_id="postToShow.id"/>
        <comment :isOpen="true" :comments="getComments" :postId="postToShow.id" :commentStatus="postToShow.comment_status" />
    </div>
</template>

<script>
    import hljs from 'highlight.js/lib/highlight'
    import _get from 'lodash/get'
    import { mapGetters } from 'vuex'
    import Loader from './partials/Loader'
    import Comment from './partials/Comment'
    import RelatedPosts from "./widgets/RelatedPosts"

    import javascript from "highlight.js/lib/languages/javascript"
    import css from "highlight.js/lib/languages/css"
    import yaml from "highlight.js/lib/languages/yaml"
    import python from "highlight.js/lib/languages/python"
    import php from "highlight.js/lib/languages/php"
    import shell from "highlight.js/lib/languages/shell"
    import swift from "highlight.js/lib/languages/swift"

    export default {
        computed: {
            ...mapGetters({
                postToShow: "postToShow",
                postLoaded: "postLoaded",
                loadedPosts: "loadedPosts",
            }),
            category_name: function () {
                return _get(this.postToShow, '_embedded.wp:term.0.0.name')
            },
            breadCrumbs: function () {
                return [{
                    to: '/',
                    text: 'HOME'
                },{
                    to: `/category/${this.category_name}`,
                    text: this.category_name
                }]
            },
            getComments: function () {
                return _get(this.postToShow, '_embedded.replies.0')
            }
        },
        methods: {
            enableHighlight: () => {
                hljs.registerLanguage("javascript", javascript)
                hljs.registerLanguage("css", css)
                hljs.registerLanguage("yaml", yaml)
                hljs.registerLanguage("python", python)
                hljs.registerLanguage("php", php)
                hljs.registerLanguage("shell", shell)
                hljs.registerLanguage("swift", swift)
                const blocks = document.querySelectorAll('pre code')
                blocks.forEach(block => {
                    hljs.highlightBlock(block);
                })
            },
            createToc: () => {
                var contentsList = document.getElementById('toc'); // 目次を追加する先(table of contents)
                contentsList.innerHTML = ''
                var div = document.createElement('div'); // 作成する目次のコンテナ要素
                // .entry-content配下のh2、h3要素を全て取得する
                var matches = document.querySelectorAll('.post h2, .post h3');
                // 取得した見出しタグ要素の数だけ以下の操作を繰り返す
                matches.forEach(function (value, i) {
                    // 見出しタグ要素のidを取得し空の場合は内容をidにする
                    var id = value.id;
                    if(id === '') {
                        id = value.textContent;
                        value.id = id;
                    }
                    // 要素がh2タグの場合
                    if(value.tagName === 'H2') {
                        var ul = document.createElement('ul');
                        var li = document.createElement('li');
                        var a = document.createElement('a');
                        // 追加する<ul><li><a>タイトル</a></li></ul>を準備する
                        a.innerHTML = value.textContent;
                        a.href = '#' + value.id;
                        li.appendChild(a)
                        ul.appendChild(li);
                        // コンテナ要素である<div>の中に要素を追加する
                        div.appendChild(ul);
                    }
                    // 要素がh3タグの場合
                    if(value.tagName === 'H3') {
                        var ul = document.createElement('ul');
                        var li = document.createElement('li');
                        var a = document.createElement('a');
                        // コンテナ要素である<div>の中から最後の<li>を取得する。
                        var lastUl = div.lastElementChild;
                        var lastLi = lastUl.lastElementChild;
                        // 追加する<ul><li><a>タイトル</a></li></ul>を準備する
                        a.innerHTML = value.textContent;
                        a.href = '#' + value.id;
                        li.appendChild(a)
                        ul.appendChild(li);
                        // 最後の<li>の中に要素を追加する
                        lastLi.appendChild(ul);
                    }
                });
                // 最後に画面にレンダリング
                contentsList.appendChild(div);
            }
        },
        mounted() {
            if (this.loadedPosts.length) {
                // 選択した記事が既に読み込み済だった場合はそれを表示する
                this.loadedPosts.map((post, index) => {
                    const params = this.$route.params
                    const slug = `/${params.year}/${params.month}/${params.day}/${params.postSlug}/`
                    if (post.slug === slug) {
                      this.$store.dispatch("setPostToShow", { postToSave: post })
                    } else if (index === (this.loadedPosts.length - 1)) {
                        this.$store.dispatch("getPostBySlug", { slug: this.$route.params.postSlug })
                    }
                })
            } else {
              this.$store.dispatch("getPostBySlug", { slug: this.$route.params.postSlug })
            }
            this.$store.dispatch('updateBreadCrumbs', { breadCrumbs: this.breadCrumbs })
        },
        updated() {
            this.$nextTick(() => {
                this.enableHighlight()
                this.createToc()
            })
        },
        components: {
            Loader,
            Comment,
            RelatedPosts
        },
    }
</script>