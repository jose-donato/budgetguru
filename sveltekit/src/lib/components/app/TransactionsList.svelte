<script>
  import { formatBigNumber } from "$lib/db/helpers";
  import { categoriesInfo } from "$lib/utils/helpers";
  import classNames from "classnames";

  export let transactions;
</script>

<div class="flex flex-col gap-2.5 w-full">
  {#each transactions.reverse().slice(0, 10) as transaction}
    <div
      class="_card flex flex-row justify-between items-center w-full p-2 rounded-md"
    >
      <div class="flex items-center gap-2.5">
        <div
          title={transaction.category}
          class="rounded p-1 w-8 h-8 flex justify-center items-center"
        >
          <span>
            {categoriesInfo[transaction.category].icon}
          </span>
        </div>
        <div>
          <p class="font-semibold">{transaction.description}</p>
          <p class="text-gray-500 capitalize">
            {transaction.category}
          </p>
        </div>
      </div>
      <div>
        <p
          class={classNames("whitespace-nowrap text-right font-medium", {
            "text-green-500": transaction.type === "income",
            "text-red-500": transaction.type === "expense",
          })}
        >
          {formatBigNumber(
            transaction.amount,
            "USD",
            transaction.type === "expense"
          )}
        </p>
        <p class="text-gray-600 text-right">
          {new Date(transaction.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  {/each}
</div>
