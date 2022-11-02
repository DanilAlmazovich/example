<template>
  <div class="container brand-list">
    <h2>Страницы брендов</h2>
    <div class="brands__swiper">
      <locale-link
          class="companies__brend fly-hover"
          v-for="(brand, index) in popularBrand"
          :key="index"
          :to="toBrand(brand)"
      >
        <img
            v-lazy="brand.logo"
            :alt="brand.name"
        />
      </locale-link>
    </div>
    <h2 class="total-brands">
      Бренды на сайте
      <span class="amount-brands">{{ totalCount }}</span>
    </h2>
    <br/>
    <h3 class="all-brands">
      Все бренды
    </h3>
    <div>
       <span
           v-for="(letter, index) in alphabet"
           :key="letter.id"
           @click="scrollToChar(index)"
           class="pag-alf"

       >{{ letter.character }}</span
       >
    </div>
    <div v-for="{ char, chunk } in chunkedBrands" :key="char">
      <div class="alp-box-sym">
                <span class="brand-sym">
                    {{ char }}
                </span>
        <span
            class="brand-sym-btn"
            :class="{brandActive: selectedId === char}"
            @click="openCharBrands(char)"
            ref="navlist"
        >Все бренды на {{ char }}</span
        >
      </div>

      <div class="content-brandss" ref="nav">
        <ul v-for="(arr, index) in chunk" :key="index">
          <li v-for="(elems, index) in arr" :key="index">
            <locale-link :to="toBrand(elems)" :title="elems.name">{{ elems.name.length > 25 ? elems.name.substring(0, 25) + '...' : elems.name }}</locale-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import toBrand from '~/mixins/to-brand';
import axios from 'axios';
import {carouselSettingSingle} from '~/utilities/carousel';
import {mapActions, mapGetters} from 'vuex';
import CompaniesBrands from "~/components/main/CompaniesBrands";


export default {
  props: {
    popularBrands: {
      type: Array,
      default: () => {
      },
    },
  },
  components: {CompaniesBrands},
  head() {
    return {
      title: "AZOR - Бренды",

      link: [
        {
          rel: 'canonical',
          href: 'https://azor.kg',
        }
      ],
    }

  },
  data() {
    return {
      isActive: false,
      popularBrand: [],
      newArr: [],
      totalCount: 0,
      selectedId: null,
      smallSize: 8,
      bigSize: 0,
      brandsByChar: {},
      smallBrandsByChar: {},
      bigBrandsByChar: {},
      lengthBrands: null,
      API: '/api/brands',
      alphabet: [
        {character: 'A', status: false},
        {character: 'B', status: false},
        {character: 'C', status: false},
        {character: 'D', status: false},
        {character: 'E', status: false},
        {character: 'F', status: false},
        {character: 'G', status: false},
        {character: 'H', status: false},
        {character: 'I', status: false},
        {character: 'J', status: false},
        {character: 'K', status: false},
        {character: 'L', status: false},
        {character: 'M', status: false},
        {character: 'N', status: false},
        {character: 'O', status: false},
        {character: 'P', status: false},
        {character: 'Q', status: false},
        {character: 'R', status: false},
        {character: 'S', status: false},
        {character: 'T', status: false},
        {character: 'U', status: false},
        {character: 'V', status: false},
        {character: 'W', status: false},
        {character: 'X', status: false},
        {character: 'Y', status: false},
        {character: 'Z', status: false},
        {character: '123', status: false},
        {character: 'А-Я', status: false},
      ],
    };
  },
  mounted() {
    this.getPopularBrands();
    this.getBrandsByChar().finally(() => {
      this.getBrandsByChar(0).finally(() => {
        for (let key in this.brandsByChar) {
          this.totalCount += this.brandsByChar[key].length;
        }
      });
    });
  },
  mixins: [toBrand],
  methods: {
    ...mapActions('elements', ['toggleHeaderCategory', 'closeAll']),

    async getPopularBrands() {
      await this.$axios
          .get('/api/home/popular-brands')
          .then((response) => {
            this.popularBrand = response?.data?.data || null;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.popularBrandsLoading = false;
          });
    },

    getBrandsByChar: async function (char = 'a') {
      if (`${char}`.length > 1) return;
      try {
        const {success, data, next_char} = await axios
            .get(this.API, {
              params: {
                char,
              },
            })
            .then((response) => {

              return response.data;
            });

        if (!success) return;

        if (data) {
          const {en, ru, num} = data.reduce(
              ({en, ru, num}, item) => {
                if (item.name.match('^[А-я]')) ru.push(item);
                else if (item.slug.match('^[0-9]')) num.push(item);
                else en.push(item);

                return {
                  en,
                  ru,
                  num,
                };
              },
              {en: [], ru: [], num: []}
          );

          if (en.length) {
            this.test(en, char);
          }
          if (ru.length) {
            this.test(ru, 'а-я');
          }
          if (num.length) {
            this.test(num, '123');
          }
        }
        if (next_char) await this.getBrandsByChar(next_char);
      } catch (error) {
        console.log(error);
      }
    },
    test(data, key) {
      if (!(key in this.brandsByChar)) {
        this.$set(this.brandsByChar, key, this.clearObject(data));
      } else {
        this.brandsByChar[key].push(...this.clearObject(data));
      }
    },
    openCharBrands(character) {
      this.selectedId = character;
      this.alphabet.forEach((item) => {
        if (item.character === character) {
          this.isActive = true
          item.status = !item.status;
        } else {
          item.status = false;
        }
        this.isActive = false
      });
    },
    clearObject(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    scrollToChar(index) {
      let elems = this.$refs.navlist[index];
      let top = elems.offsetTop - 65;
      window.scrollTo({top, behavior: 'smooth'});
    },
    chunk(array, chunkSize) {
      const newArr = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        newArr.push(array.slice(i, i + chunkSize));
      }
      return newArr;
    },
  },
  computed: {
    chunkedBrands() {
      return this.alphabet.map(({character, status}) => {
        let children = this.brandsByChar[`${character}`.toLowerCase()] ?? [];
        let size = 8;
        if (status) size = Math.ceil(children.length / 7);
        else children = children.slice(0, 55);
        return {
          char: character,
           chunk: this.chunk(children, size),
        };
      });
    },
  },
};
</script>
