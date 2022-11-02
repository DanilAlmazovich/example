<template>
    <div class="product-actions">
        <button class="azor-cart" @click.prevent="openDeliverInModal">
            {{ buttonText }}
        </button>
        <button
            class="product-actions-icon heart azor-wishlist"
            :class="{ 'azor-wishlist_fill': inWhishlist }"
            @click.prevent="setWishlist(product)"
            :disabled="wishlistLoading"
        ></button>
        <div
            class="heart-loading"
            v-if="wishlistLoading"
            :class="{ 'heart-loading-center': center }"
        >
            <svg
                class="product__wishlist--icon"
                width="45"
                height="45"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    id="heart"
                    stroke-width="1"
                    d="M17.89 10.27L10.89 16.8C10.6942 17.0364 10.4335 17.2103 10.14 17.3H9.99996C9.93701 17.3098 9.87292 17.3098 9.80996 17.3C9.5174 17.2191 9.25603 17.0518 9.05996 16.82L2.10996 10.27C1.0674 9.30334 0.42685 7.97967 0.315679 6.56224C0.204508 5.14482 0.630863 3.73747 1.50996 2.62005L1.81996 2.22005C2.32178 1.56266 2.98462 1.04577 3.74447 0.719285C4.50433 0.392799 5.33553 0.267749 6.15781 0.356209C6.98009 0.44467 7.76567 0.743653 8.4387 1.22429C9.11172 1.70492 9.64945 2.35097 9.99996 3.10005C10.3744 2.36043 10.9269 1.72552 11.6077 1.25246C12.2885 0.779403 13.0762 0.483041 13.9 0.390046C14.7169 0.294005 15.5448 0.412224 16.3023 0.733081C17.0597 1.05394 17.7206 1.56639 18.22 2.22005L18.53 2.62005C19.4042 3.74228 19.8237 5.15254 19.7051 6.57013C19.5865 7.98771 18.9385 9.30866 17.89 10.27Z"
                />
            </svg>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import setWishlist from '~/mixins/set-wishlist';
export default {
    data() {
        return {
            heart: false,
            message: false,
            selectedImage: null,
            imageStatus: true,
            fetched: null,
            related: null,
            random: [],
            productVariation: null,
            wishlistLoading: false,
        };
    },
    props: {
        buttonText: String,
        product: {
            type: Object,
            default: null,
        },
        center: Boolean,
    },
    computed: {
        ...mapState({
            wishlist: (state) => state.wishlist.list,
        }),
        inWhishlist() {
            if (this.wishlist) {
                return this.wishlist.find(
                    (item) => item.id === this.product.id
                );
            }
            return false;
        },
    },
    mixins: [setWishlist],
    methods: {
        openDeliverInModal: function () {
            this.$modal.show(
                () => import('~/components/modals/QuickViewModal'),
                { product: this.product },
                {
                    maxWidth: 1050,
                    width: '95%',
                    maxHeight: 1000,
                    height: 'auto',
                    adaptive: true,
                }
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.product-actions {
    display: flex;
    align-items: center;
    height: 20px;
    justify-content: space-between;
    background-color: white;
    .product-actions-icon {
        font-size: 20px;
        transition: 0.3s;
    }
    div {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    button {
        white-space: nowrap;
        padding: 0;
        transition: 0.3s;
        color: #131921;
        &.heart {
            color: #ff741f;
        }
        &:hover {
            color: #ff741f;
        }
    }
    body {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #d1bfff;
    }
    .heart-loading {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(241, 241, 241, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 130px;
        cursor: not-allowed;
        #heart {
            stroke-linejoin: round;
            stroke-linecap: round;
            stroke-dashoffset: 80;
            stroke-dasharray: 80;
            /*animation: stroke 0.5s ease-in-out;*/
            animation: stroke 2s ease-in-out infinite alternate;
            stroke: #ff741f;
        }
        @keyframes stroke {
            to {
                stroke-dashoffset: 0;
            }
        }
    }
    .heart-loading-center {
        padding: 0;
    }
}

// .product-actions-icon {
//     display: flex;
//     align-items: center;
//     color: #131921;
//     &:last-child {
//         color: #ff741f;
//     }
//     &::before {
//         margin: 0;
//         padding: 0;
//         &:hover {
//             color: #ff741f;
//         }
//     }
// }
.azor-cart {
    display: flex;
    align-items: center;
    gap: 5px;
    &::before {
        font-size: 23px;
        margin: 0;
    }
}

@media (max-width: 400px) {
    .product-actions {
        button {
            font-size: 12px;
        }
    }
    .product-actions-icon {
        color: #131921;
        &::before {
            font-size: 20px;
        }
    }
}
</style>

