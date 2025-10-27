<script lang="ts">
	import { Collapsible } from 'bits-ui'
	import Icon from '@iconify/svelte'
	import Input from '../ui/Input.svelte'
	import SelectDirection from '../ui/SelectDirection.svelte'
	import SelectPoi from '../ui/SelectPoiForm.svelte'
	import EditSign from './EditSign.svelte'
	import SelectRouteSymbol from '../ui/SelectRouteForm.svelte'
	import type { Sign } from '$lib/states/signs.svelte'

	import { addSignAfter, deleteSign, moveSignDown, moveSignUp } from '$lib/states/signs.svelte'

	type Props = {
		sign: Sign
		collapsed?: boolean
		editMode?: 'graphic' | 'form'
	}

	let {
		sign = $bindable<Sign>(),
		collapsed = $bindable<boolean>(false),
		editMode = 'graphic'
	}: Props = $props()

</script>

<Collapsible.Root open={!collapsed} class="w-full flex flex-col bg-slate-200 rounded text-sm mb-2">
	<!-- header -->
	<div class="w-full flex p-3 text-slate-800">
		<div class="font-semibold">{sign.route.name} - {sign.route.signNumber}</div>
		<div class="flex ml-auto items-center gap-x-2">
			<div class="flex gap-x-2 bg-slate-100 rounded-full px-2 py-1 *:cursor-pointer">
				<Icon
					icon="tabler:arrow-up"
					class="size-4 text-slate-600"
					onclick={() => moveSignUp(sign.id)}
				/>
				<Icon
					icon="tabler:arrow-down"
					class="size-4 text-slate-600"
					onclick={() => moveSignDown(sign.id)}
				/>

				<Icon
					icon="tabler:trash"
					class="size-4 text-slate-600 hover:text-red-500"
					onclick={() => deleteSign(sign.id)}
				/>
			</div>

			<Collapsible.Trigger class="group" aria-label="Collapse">
				<Icon
					icon="tabler:chevron-down"
					class="size-5 group-data-[state=open]:rotate-180 transition-transform"
				/>
			</Collapsible.Trigger>
		</div>
	</div>

	<Collapsible.Content hiddenUntilFound>
		<!-- parameters for sign -->
		<div class="w-full p-3 pt-0 text-slate-800 flex flex-col gap-y-2">
			{#if editMode === 'form'}
				<!-- Route -->
				<div class="w-full rounded bg-slate-300 p-3 grid grid-cols-3 gap-2">
					<span class="col-span-2"
						><Input
							label="Titel des Schildes"
							type="text"
							bind:value={sign.route.name}
						/></span
					>
					<Input
						label="Nummer des Schildes"
						type="text"
						bind:value={sign.route.signNumber}
					/>
					<SelectRouteSymbol label="Wegesymbol 1" bind:value={sign.route.symbols[0]} />
					<SelectRouteSymbol label="Wegesymbol 2" bind:value={sign.route.symbols[1]} />
				</div>

				<!-- Ziel 1 -->
				<div class="w-full rounded bg-slate-300 p-3 grid grid-cols-3 gap-2">
					<span class="col-span-2"
						><Input
							label="Name des Ziel 1"
							type="text"
							bind:value={sign.directions[0].name}
						/></span
					>

					<Input
						label="Entfernung"
						type="text"
						bind:value={sign.directions[0].distance}
					/>
					<SelectPoi label="Symbol 1" bind:value={sign.directions[0].symbols[0]} />
					<SelectPoi label="Symbol 2" bind:value={sign.directions[0].symbols[1]} />
				</div>

				<!-- Ziel 2 -->
				<div class="w-full rounded bg-slate-300 p-3 grid grid-cols-3 gap-2">
					<span class="col-span-2"
						><Input
							label="Name des Ziel 2"
							type="text"
							bind:value={sign.directions[1].name}
						/></span
					>
					<Input
						label="Entfernung"
						type="text"
						bind:value={sign.directions[1].distance}
					/>
					<SelectPoi label="Symbol 1" bind:value={sign.directions[1].symbols[0]} />
					<SelectPoi label="Symbol 2" bind:value={sign.directions[1].symbols[1]} />
				</div>

				<!-- Montage -->
				<div class="w-full rounded bg-slate-300 p-3 grid grid-cols-3 gap-2">
					<SelectDirection label="Ausrichtung" bind:value={sign.route.direction} />
					<Input label="Winkel" type="number" bind:value={sign.appearance.orientation} />
					<Input label="Befestigung" type="text" bind:value={sign.appearance.mounting} />
				</div>
			{:else}

			<!-- svg preview -->
			<div class="w-full rounded bg-slate-300 p-3 overflow-hidden">
				<EditSign bind:sign />
			</div>
			{/if}
		</div>
	</Collapsible.Content>
</Collapsible.Root>

<!-- Button to add new schild below -->
<div class="w-full flex justify-center mb-2">
	<button
		class="inline-flex gap-x-2 items-center px-4 py-1 bg-slate-400 text-sm text-white rounded hover:bg-slate-700 transition-colors"
		onclick={() => addSignAfter(sign.id)}
	>
		<Icon icon="tabler:circle-plus-filled" class="size-5" />
		Schild einfügen
	</button>
</div>
