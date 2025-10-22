<script lang="ts">
	import { Collapsible } from 'bits-ui'
	import Icon from '@iconify/svelte'
	import Input from '../ui/Input.svelte'
	import SelectDirection from '../ui/SelectDirection.svelte'
	import SelectPictogram from '../ui/SelectPictogram.svelte'
	import PreviewSign from './PreviewSign.svelte'
	import SelectWaySymbol from '../ui/SelectWaySymbol.svelte'
	import type { Sign } from '$lib/states/signs.svelte'

	import { addSignAfter, deleteSign } from '$lib/states/signs.svelte'

	let { sign }: { sign: Sign } = $props()
</script>

<Collapsible.Root open class="w-full flex flex-col bg-slate-200 rounded text-sm">
	<!-- header -->
	<div class="w-full flex p-3 text-slate-800">
		<div class="font-semibold">{sign.route.name} - {sign.route.signNumber}</div>
		<div class="flex ml-auto items-center gap-x-2">
			<Icon
				icon="tabler:trash"
				class="size-5 text-slate-600 hover:text-red-800"
				onclick={() => deleteSign(sign.id)}
			/>
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
			<!-- General -->
			<div class="w-full rounded bg-slate-300 p-3 grid grid-cols-3 gap-2">
				<span class="col-span-2"
					><Input
						label="Titel des Schildes"
						type="text"
						bind:value={sign.route.name}
					/></span
				>
				<Input label="Nummer des Schildes" type="text" bind:value={sign.route.signNumber} />
				<SelectWaySymbol label="Wegesymbol 1" bind:value={sign.route.symbols[0]} />
				<SelectWaySymbol label="Wegesymbol 2" bind:value={sign.route.symbols[1]} />
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

				<Input label="Entfernung" type="text" bind:value={sign.directions[0].distance} />
				<SelectPictogram label="Symbol 1" bind:value={sign.directions[0].symbols[0]} />
				<SelectPictogram label="Symbol 2" bind:value={sign.directions[0].symbols[1]} />
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
				<Input label="Entfernung" type="text" bind:value={sign.directions[1].distance} />
				<SelectPictogram label="Symbol 1" bind:value={sign.directions[1].symbols[0]} />
				<SelectPictogram label="Symbol 2" bind:value={sign.directions[1].symbols[1]} />
			</div>

			<!-- Montage -->
			<div class="w-full rounded bg-slate-300 p-3 grid grid-cols-3 gap-2">
				<SelectDirection label="Ausrichtung" bind:value={sign.route.direction} />
				<Input label="Winkel" type="number" bind:value={sign.appearance.orientation} />
				<Input label="Befestigung" type="text" bind:value={sign.appearance.mounting} />
			</div>

			<!-- svg preview -->
			<div class="w-full rounded bg-slate-300 p-3 overflow-hidden">
				<PreviewSign label="Vorschau" {sign} />
			</div>
		</div>
	</Collapsible.Content>
</Collapsible.Root>

<!-- Button to add new schild below -->
<div class="w-full flex justify-center">
	<button
		class="inline-flex gap-x-2 items-center px-4 py-1 bg-slate-400 text-sm text-white rounded hover:bg-slate-700 transition-colors"
		onclick={() => addSignAfter(sign.id)}
	>
		<Icon icon="tabler:circle-plus-filled" class="size-5" />
		Schild hinzufügen
	</button>
</div>
