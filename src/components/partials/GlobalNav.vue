<template>
    <div class="global-nav-container">
        <div class="global-nav">
            <ul class="nav">
                <li><a href="#">aaaaaaaaaaaaaaaaa</a></li>
                <li><a href="#">bbbbbbbbbbbbbbbbbbbbbb</a></li>
                <li><a href="#">cccccccccccccccccccccc</a></li>
            </ul>
            <div class="search-container">
                <div class="search-form">
                    search form
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
    /*.global-nav-container {*/

    /*    background-color: gray;*/
    /*    display: flex;*/
    /*    justify-content: space-between;*/
    /*    align-items: center;*/

    /*    .global-nav {*/
    /*        width: 80%;*/
    /*        margin: 0 auto;*/
    /*        .nav {*/
    /*            width: 600px;*/
    /*            display: flex;*/
    /*            flex-flow: row wrap;*/
    /*            justify-content: space-between;*/
    /*            margin: 0;*/
    /*            height: 40px;*/

    /*            li {*/
    /*                list-style: none;*/
    /*                background-color: #0d99d5;*/
    /*                height: 100%;*/
    /*                flex-basis: 200px;*/
    /*                margin-right: 10px;*/
    /*                display: table;*/
    /*                a {*/
    /*                    height: 100%;*/
    /*                    display: table-cell;*/
    /*                    vertical-align: middle;*/
    /*                    text-align: center;*/
    /*                    padding: 0 10px;*/
    /*                }*/
    /*            }*/
    /*        }*/
    /*    }*/

    /*    .search-container {*/
    /*        flex: 1;*/
    /*        text-align: right;*/

    /*        .search-form {*/
    /*            display: inline-block;*/
    /*        }*/
    /*    }*/
    /*}*/

    .global-nav-container {
        background-color :pink;
        height: 40px;
        .global-nav {
            width: 1000px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
        }
    }

    .nav {
        display : flex;
        flex-flow: row wrap;
        width: 600px;
        height: 100%;
        margin: 0;
        padding: 0;
        li {
            height: 100%;
            list-style: none;
            display: table;
            text-align: center;
            padding: 0 5px;
            border-left: 1px solid #fff;
            &:last-child{
                border-right: 1px solid #fff;
            }
            background-color : gray;
            a  {
                display: table-cell;
                height: 100%;
                vertical-align: middle;
            }
        }
    }
    .search-container {
        display: table;
        height: 100%;
        text-align: right;

        .search-form {
            display: table-cell;
            vertical-align: middle;
        }
    }

</style>