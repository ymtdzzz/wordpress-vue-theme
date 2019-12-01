<template>
    <div class="card-container">
        <a class="card-link" href="#"></a>
        <div class="post-card">
            <div class="post-card-header">
                <div class="post-card-tags">
                    <a href="https://yahoo.co.jp" class="tag">#AWS</a>
                    <a href="https://yahoo.co.jp" class="tag">#Laravel</a>
                    <a href="https://yahoo.co.jp" class="tag">#Vue.js</a>
                </div>
                <div class="post-card-title">{{ post.title.rendered }}</div>
                <div class="post-card-sub"> 2019年11月21日（木）  </div>
            </div>
            <div class="post-card-feature">
                <span>記事の内容記事の内容記事の内容記事の内容記事の内容記事の内容記事の内容記事の内容記事の内容記事の内容記事の内記事の内容記事の内容記事の内容記事の内容記事の内容容記事の内容記事の内容記事の内容記事の内容記事の内容記事の内容記事の内容記事の内容</span>
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
    }
</script>

<style lang="scss" scoped>

    .card-container {
        transition: all 300ms;
        /*max-width: 1100px;*/
        display: flex;
        position: relative;
        /*overflow: hidden;*/
        margin: 20px 0;
        filter: drop-shadow(0 2px 1rem #ddd);
        border-radius: 5px;
        z-index: 1;
        top: 0;

        &:hover {
            top: -5px;
        }

        a.card-link {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            text-indent:-999px;
            z-index: 2;
        }
    }
    @media screen and (min-width: 700px) {
        .card-container {
            height: 230px;
            max-height: 300px;
        }
    }
    @media screen and (max-width: 700px) {
        .card-container {
            height: auto;
            width: auto;
            flex-direction: column;
            border-radius: 2px;
            margin: 12px 0px;
        }
    }

    .post-card {
        transition: all 600ms ease;
        border-radius: 5px;
        background: white;
        margin: 0 auto;
        z-index: 0;
        /*padding: 15px 25px 15px 40px;*/
        position: relative;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
    }
    @media screen and (max-width: 700px) {
        .post-card {
            /*margin: 25px 15px 30px 15px;*/
            /*padding: 60px 25px 20px;*/
            width: auto;
            height: auto;
            flex: 1 0 auto;
        }
    }

    .post-card-header {
        background-color: white;
        flex: 1 1 auto;
        padding: 15px 25px;
        border-radius: 5px 5px 0 0;
        border-bottom: 1px solid #aaa;
    }
    
    .post-card-title {
        font-size: 24px;
        margin-top: 12px;
        color: black;
        width: 100%;
        text-overflow: ellipsis;
        /*flex: 0 0 auto;*/
    }
    @media screen and (max-width: 700px) {
        .post-card-title {
            font-size: 16px;
            white-space: initial;
            overflow: initial;
            text-overflow: initial;
        }
    }

    .post-card-sub {
        font-size: 14px;
        margin: 5px 0 8px 0;
        /*flex: 1 1 auto;*/
        /*overflow: hidden;*/
        -webkit-mask-image: linear-gradient(black 80%, transparent 100%);
        color: black;
    }
    @media screen and (max-width: 700px) {
        .post-card-sub {
            font-size: 13px;
        }
    }

    .post-card-tags {

        a.tag {
            display: inline-block;
            padding: 3px 6px;
            border: 1px solid black;
            position: relative;
            z-index: 3;
            text-decoration: none;
            color: black;
        }
    }

    .post-card-feature {
        font-size: 13px;
        color: #5f5f80;
        flex: 1 1 auto;
        padding: 10px 25px 0 25px;
        margin-bottom: 5px;
        line-height: 1.3;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(black 50%, transparent 100%);
    }
    @media screen and (max-width: 700px) {
        .post-card-feature {
            font-size: 12px;
            margin-top: 10px;
            text-align: center;
        }
    }
    .post-card-feature span:not(:first-child):before {
        content: " • ";
        margin: 3px;
    }

    .bottom-row {
        flex: 0 1 auto;
        margin-top: 10px;
        display: flex;
        justify-items: space-around;
        align-items: center;
    }
    @media screen and (max-width: 700px) {
        .bottom-row {
            border-top: solid 1px rgba(255, 255, 255, 0.05);
            padding-top: 5px;
        }
    }
    .bottom-row .pxc-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    @media screen and (max-width: 700px) {
        .bottom-row .pxc-info {
            position: absolute;
            bottom: -28px;
            left: -10px;
            justify-content: space-between;
            width: 100%;
        }
        .bottom-row .pxc-info .region {
            color: #112;
            font-size: 13px;
            text-transform: uppercase;
        }
    }
    .bottom-row .links {
        display: flex;
        align-content: flex-end;
        flex: 1 0 auto;
        justify-content: flex-end;
    }
    .bottom-row .links a {
        color: #99D;
        font-size: 28px;
        text-align: center;
        width: 48px;
        height: 48px;
        display: inline-block;
        margin: 0 10px;
        cursor: pointer;
    }
    .bottom-row .links a:hover {
        color: #EEF;
    }
    @media screen and (max-width: 700px) {
        .bottom-row .links {
            justify-content: center;
            margin-top: 10px;
            margin-bottom: -10px;
        }
        .bottom-row .links a {
            color: #a6aad1;
        }
    }
    .bottom-row .flags {
        overflow: hidden;
        height: 23px;
    }
    .bottom-row .flags span {
        margin: 2px 6px;
        background: white;
        border-radius: 3px;
        width: 24px;
        height: 16px;
        display: inline-block;
    }
    .bottom-row .region {
        color: white;
        margin-left: 8px;
    }
</style>