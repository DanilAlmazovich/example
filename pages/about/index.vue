<template>
  <div class="about container">
      <div class="about-banner shadow">
         <div>
            <h2>Вас приветствует <span>Azor</span> маркетплейс </h2>
            <b>Мы хотим стать лучшими друзьями для наших покупателей и партнеров </b>
         </div>
         <img v-lazy="'./images/backgrounds/about.svg'" alt="about"/>
      </div>
      <div class="about-statistic">
         <div class="shadow">
            <b>710000+</b>
            <span>Товаров на сайте</span>
         </div>
         <div class="shadow">
            <b>22000+</b>
            <span>Брендов на сайте</span>
         </div>
      </div>
      <div class="about-bonefit">
         <div class="about-bonefit-block">
            <div class="about-binefit-content shadow">
               <b>Скидки <br> и акции</b>
               <img v-lazy="'./images/big-icons/about-bonefit.svg'" alt="bonefit"/>
            </div>
            <!-- <div class="about-binefit-text">
               <b>Скидки и акции</b>
               <span>Товаров доставляются в указанный срок</span>
            </div> -->
         </div>
         <div class="about-bonefit-block">
            <div class="about-binefit-content shadow">
               <b>Бесплатная <br> доставка</b>
               <img v-lazy="'./images/big-icons/about-bonefit2.svg'" alt="bonefit2"/>
            </div>
            <!-- <div class="about-binefit-text">
               <b>Более 90%</b>
               <span>Товаров доставляются в указанный срок</span>
            </div> -->
         </div>
         <div class="about-bonefit-block">
            <div class="about-binefit-content shadow">
               <b>Удобный <br> самовывоз</b>
               <img v-lazy="'./images/big-icons/about-bonefit3.svg'" alt="bonefit3"/>
            </div>
            <!-- <div class="about-binefit-text">
               <b>Удобный самовывоз</b>
               <span>Товаров доставляются в указанный срок</span>
            </div> -->
         </div>
         <div class="about-bonefit-block">
            <div class="about-binefit-content shadow">
               <b>Широкий <br> ассортимент</b>
               <img v-lazy="'./images/big-icons/about-bonefit4.svg'" alt="bonefit4"/>
            </div>
            <!-- <div class="about-binefit-text">
               <b>Широкий ассортимент</b>
               <span>Товаров доставляются в указанный срок</span>
            </div> -->
         </div>

      </div>
      <div class="abount-partner" v-if="hasPartners">
         <h2>Наши партнеры:</h2>
         <PartnerBanner :partners="partners" :partnersLoading="partnersLoading"/>
      </div>
  </div>
</template>

<script>
import PartnerBanner from '~/components/main/PartnerBanner.vue';
export default {
   components: { PartnerBanner },
   data() {
      return {
         partners: [],
         partnersLoading: true
      };
   },
   methods: {
      async getPartners() {
         await this.$axios
         .get('/api/home/partners')
         .then((response) => {
            this.partners = response.data.data;
         })
         .catch((error) => {
            console.log(error);
         })
         .finally(() => {
            this.partnersLoading = false;
         });
      },
   },
   mounted() {
      this.getPartners()
   }
}
</script>

<style lang="scss">
   .about{
      margin: 50px auto;
   }
   .about-banner{
      display: flex;
      justify-content: space-between;
      padding: 20px 50px;
      align-items: center;
      height: auto;
      background: #FFFFFF;
      border-radius: 8px;
      div{
         max-width: 600px;
         h2{
            font-weight: 700;
            font-size: 60px;
            color: #293845;
            line-height: 60px;
            span{
               color: #FF741F;
            }
         }
         b{
            font-size: 24px;
            line-height: 35px;
         }
      }
   }
   .about-statistic{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 20px;
      div{
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         align-items: center;
         height: auto;
         border-radius: 8px;
         padding: 20px;
         b{
            font-weight: 700;
            font-size: 50px;
            color: #293845;
            line-height: 60px; 
         }
         span{
            font-size: 20px;
            line-height: 35px;
         }
      }
   }
   .about-bonefit{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 20px;
      margin-top: 30px;
      .about-bonefit-block{
         .about-binefit-content{
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            border-radius: 8px;
            padding: 40px 0;
            b{
               font-weight: 700;
               font-size: 30px;
               line-height: 32px;
               color: #232F3E;
            }
            img{
               height: 185px;
            }
         }
         .about-binefit-text{
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            margin-top: 10px;
            padding: 0 10px;
            b{
               font-weight: 700;
               font-size: 30px;
               line-height: 50px;
               color: #232F3E;
            }
            span{
               font-weight: 400;
               font-size: 16px;
               line-height: 20px;
               color: #999999;
            }
         }
      }
   }
   .abount-partner{
      text-align: center;
   }
   @media (max-width: 991px) {
      .about-banner{
         flex-direction: column;
         padding: 20px;
         div{
            h2{
               font-size: 26px;
               margin: 0 0 20px 0;
               line-height: 25px;
            }
            b{
               font-size: 18px;
               line-height: 18px;
            }
         }
         img{
            width: 300px;
         }
      }
      .about-statistic{
         div{
            b{
               font-size: 26px;
            }
         }
      }
      .about-bonefit{
         grid-template-columns: 1fr 1fr;
      }
   }
   @media (max-width: 450px) {
      .about-statistic{
         grid-template-columns: 1fr;
         div{
            padding: 10px;
         }
      }
      .about-bonefit{
         grid-template-columns: 1fr;
         .about-bonefit-block{
            .about-binefit-content{
               padding: 20px 0;
            }
         }
      }
   }
</style>