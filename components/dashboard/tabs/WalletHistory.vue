<template>
	<div class="wallet-history">
		<div v-if="history && history.length == 0" class="orders__list__empty">
			<no-product 
				button="К товарам" 
				head="Действия не найдены" 
				description="Никаких операции с кошельком не совершалось" 
				to="/categories"
			/>
		</div>
		<table v-if="history && history.length > 0" class="table">
			<thead class="thead">
			<tr>
				<th class="table-td-th" v-for="key in gridColumns" >
					{{ key }}
				</th>
			</tr>
			</thead>
				<tbody>
					<tr v-for="item in history" :key="item.id">
						<td class="table-td-th" data-label="Дата" >
              <div class="red upper text-left">
                {{ item.date }}
              </div>
						</td >
						<td class="table-td-th" data-label="Сумма" >
							{{ item.amount }} с
						</td>
						<td class="details table-td-th" data-label="Детали">
							{{ item.details }}
						</td>
						<td class="table-td-th" data-label="Статус">
							<button type="button" class="btn btn-success">
								Добавлен
							</button>
						</td>
					</tr>

			</tbody>
		</table>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import NoProduct from '~/components/dashboard/NoProduct.vue';
export default {
	components: {
		NoProduct
	},
	data () {
		return {
			gridColumns: ['Дата:',  'Сумма:', 'Детали:'],
		}
	},
	computed: {
		...mapState({
			history: state => state.wallet.history
		})
	},
	mounted () {
		this.$store.dispatch('wallet/get');
	}
}
</script>

