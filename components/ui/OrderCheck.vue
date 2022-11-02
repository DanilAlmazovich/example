<template>
  <div class="order-sum">
      <div class="order-sum-check">
          <p>
              <span>Промежуточный итог</span>
              <span>{{ productSum ?? '0.00' }} сом</span>
          </p>
          <p>
              <span>Стоимость доставки</span>
              <span>{{ deliveryCost ?? '0.00' }} сом</span>
          </p>
          <p>
              <span>Налог</span>
              <span>{{ tax ?? '0.00' }} сом</span>
          </p>
          <hr />
          <p>
              <span>Скидка</span>
              <span>0.00 сом</span>
          </p>
          <hr />
          <p>
              <span>Итого</span>
              <span>{{ total ?? '0.00' }} сом</span>
          </p>
      </div>
      <span class="order-law">Цены указаны с учетом всех налогов, предустмотренных действующим законодательством КР*</span>
  </div>

</template>

<script>
export default {
    props: {
        productSum: [String, Number],
        deliveryCost: [String, Number],        
        total: [String, Number],
        tax: [String, Number],
    }
};
</script>

<style lang="scss">
.order-sum{
  margin-bottom: 30px;
  .order-sum-check {
    display: flex;
    flex-direction: column;
    align-content: center;
    padding: 10px;
    border: 1px solid #EBEBEB;
    border-radius: 4px;

    hr {
      margin: 10px 0;
      padding: 0;
    }

    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #000000;
      font-weight: 400;
      font-size: 16px;
      line-height: 23px;
      @media screen and (max-width: 526px) {
        font-size: 14px;
      }

      &:last-child {
        font-weight: 400;
        font-size: 20px;
        line-height: 29px;;
        @media screen and (max-width: 526px) {
          font-size: 16px;
        }
      }
    }
  }
  .order-law{
    font-size: 10px;
    line-height: 12px;
  }
}
</style>
