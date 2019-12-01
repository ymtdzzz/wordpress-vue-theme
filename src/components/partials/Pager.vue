<template>
    <div class="pager">
        <ul class="pagination">
            <li class="pre"><a href="#"><span>«</span></a></li>
            <li><a href="#" class="active"><span>1</span></a></li>
            <li><a href="#"><span>2</span></a></li>
            <li><a href="#"><span>3</span></a></li>
            <li><a href="#"><span>4</span></a></li>
            <li><a href="#"><span>5</span></a></li>
            <li class="next"><a href="#"><span>»</span></a></li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .pager {
        display: flex;
        align-items: center;
        justify-content: center;

        .pagination {
            text-align: center;

            li {
                display: inline;
                margin: 0 2px;
                padding: 0;
                display: inline-block;
                width: 50px;
                height: 50px;
                text-align: center;
                position: relative;
                border-radius: 10px;

                a {
                    vertical-align: middle;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    display:table;
                    text-decoration: none;
                    -webkit-transition: all 0.3s ease;
                    -moz-transition: all 0.3s ease;
                    -o-transition: all 0.3s ease;
                    transition: all  0.3s ease;

                    &:hover,
                    &.active {
                        color: #fff;
                        background: black;
                    }

                    span {
                        display:table-cell;
                        vertical-align:middle;
                    }
                }
            }
        }
    }

    @media only screen and (max-width: 767px){
        .pager {

            .pagination {

                li {
                    display: none;

                    &.pre,
                    &.next {
                        display: inline-block;
                        width: 40%;
                        height: 50px;
                        text-align: center;

                        a {
                            width: 100%;
                            text-align: center;
                        }

                        span::after {
                            content: "　前の10件へ";
                        }

                        span::before {
                            content: "次の10件へ　";
                        }
                    }
                }
            }
        }
    }
    </style>