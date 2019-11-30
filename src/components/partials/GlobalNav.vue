<template>
    <div class="global-nav-container">
        <div class="global-nav">
            <ul class="nav">
                <li>aaaaaaaaaaaaaaaaaaaaaa</li>
                <li>bbbbbbbbbbbbbbbbbbbbbb</li>
                <li>cccccccccccccccccccccc</li>
            </ul>
        </div>
        <div class="search-container">
            <div class="search-form">
                search form
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .global-nav-container {
        background-color: gray;
        padding: 0 10%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .global-nav {
            flex: 1;

            .nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
                text-align: center;
                margin: 0;

                li {
                    flex: 1;
                    line-height: 40px;
                    list-style: none;
                    background-color: #0d99d5;
                    margin: 0;
                    padding: 0 5px;
                }
            }
        }

        .search-container {
            flex: 1;
            text-align: right;

            .search-form {
                display: inline-block;
            }
        }
    }
</style>