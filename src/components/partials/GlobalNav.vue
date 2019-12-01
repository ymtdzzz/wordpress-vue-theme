<template>
    <div class="global-nav-container">
        <div class="global-nav">
            <ul class="nav">
                <li><a href="#">AWS</a></li>
                <li><a href="#">PHP</a></li>
                <li><a href="#">Mac</a></li>
                <li><a href="#">Win</a></li>
                <li><a href="#">Other</a></li>
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
    .global-nav-container {
        background-color: #222;
        height: 60px;
        .global-nav {
            height: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            width: 80%;

            .nav {
                flex: 2;
            }

            .search-container {
                flex: 1;
            }
        }
    }

    .nav {
        display : flex;
        flex-flow: row wrap;
        height: 100%;
        margin: 0;
        padding: 0;
        li {
            height: 100%;
            width: 19%;
            list-style: none;
            display: table;
            text-align: center;
            border-right: 1px solid #777;
            &:last-child{
                border: none;
            }
            a {
                display: table-cell;
                height: 100%;
                vertical-align: middle;
                padding: 0 5px;
                transition: background-color 0.2s;
                text-decoration: none;
                color: white;

                &:hover {
                    background-color: #333;
                }
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