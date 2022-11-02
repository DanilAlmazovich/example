<template>
    <div aria-label="Page navigation" v-if="shouldRender">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage < 2 }">
                <locale-link class="page-link page-link-prev" :to="getPageUrl(currentPage - 1)">
                    <span aria-hidden="true">
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path d="M7.70504 1.41L6.29504 0L0.295044 6L6.29504 12L7.70504 10.59L3.12504 6L7.70504 1.41Z"
                                      fill="#131921"/>
                            </g>
                        </svg>
                    </span>
                </locale-link>
            </li>
            <li class="page-item" v-if="currentPage > 2">
                <locale-link
                    class="page-link pagination_page__link"
                    exact-active-class="active"
                    :to="getPageUrl(1)"
                >1
                </locale-link>
            </li>
            <b v-if="currentPage > 2">...</b>
            <template v-if="pagesToBeShown.length">
                <li class="page-item" v-for="page in pagesToBeShown" :key="`page-${page}`">
                    <locale-link
                        class="page-link pagination_page__link"
                        exact-active-class="active"
                        :to="getPageUrl(page)"
                    >{{ page }}
                    </locale-link>
                </li>
            </template>
            <b v-if="total > 3 && total >= currentPage + 2">...</b>
            <li class="page-item" v-if="total > 3 && total >= currentPage + 2">
                <locale-link
                    class="page-link pagination_page__link"
                    exact-active-class="active"
                    :to="getPageUrl(total)"
                >{{ total }}
                </locale-link>
            </li>

            <li class="page-item" :class="{ disabled: currentPage === total }">
                <locale-link class="page-link page-link-next" :to="getPageUrl(currentPage + 1)">
                    <span aria-hidden="true">
                       <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path d="M0.294956 1.41L1.70496 0L7.70496 6L1.70496 12L0.294956 10.59L4.87496 6L0.294956 1.41Z"
                                      fill="#131921"/>
                            </g>
                       </svg>
                    </span>
                </locale-link>
            </li>
        </ul>
    </div>
</template>
<script>
import scrollTop from '~/mixins/scroll-top';
export default {
    name: 'Pagination',
    props: {
        perPage: Number,
        total: Number,
    },
    computed: {
        shouldRender() {
            return this.total > this.perPage;
        },
        currentPage() {
            return parseInt(
                this.$route.query.page ? this.$route.query.page : 1
            );
        },
        startIndex() {
            if (!this.currentPage % this.perPage) {
                return this.currentPage;
            }
            return this.perPage * parseInt(this.currentPage / this.perPage);
        },
        pagesToBeShown: function () {
            let pageNumbers = [];
            this.pageCount =
                Math.floor(this.total / this.perPage) +
                (0 < this.total % this.perPage ? 1 : 0);

            for (let i = -1; i < 2 && this.pageCount >= 3; i++) {
                if (1 < this.currentPage && this.currentPage < this.pageCount)
                    pageNumbers.push(this.currentPage + i);
                if (1 === this.currentPage)
                    pageNumbers.push(this.currentPage + i + 1);
                if (this.currentPage === this.pageCount)
                    pageNumbers.push(this.currentPage + i - 1);
            }

            for (let i = 0; i < this.pageCount && this.pageCount < 3; i++) {
                pageNumbers.push(i + 1);
            }
            return pageNumbers;
        }
    },
    mixins: [scrollTop],
    methods: {
        getPageUrl(page) {
            let originQuery = {};
            for (let key in this.$route.query) {
                if (key !== 'page') {
                    originQuery[key] = this.$route.query[key];
                }
            }
            if (page > 1) {
                originQuery.page = page;
            }
            return {
                path: this.$route.path,
                query: originQuery,
            };
        }
    }
};
</script>
