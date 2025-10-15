<script lang="ts">
	import Input from '../ui/Input.svelte'
	import SelectDirection from '../ui/SelectDirection.svelte'
	import SelectPictogram from '../ui/SelectPictogram.svelte'

	let { title } = $props()
</script>

<section class="w-full flex flex-col bg-slate-200 rounded text-sm">
	<!-- header -->
	<div class="w-full py-1 px-3 text-slate-800 flex border-b border-slate-300">
		<div class="font-semibold">{title}</div>
	</div>

	<!-- settings for sign -->
	<div class="w-full p-3 text-slate-800 flex flex-col gap-y-2">
		<div class="w-full grid grid-cols-3 gap-2 items-stretch">
			<span class="col-span-2"><Input label="Titel des Schildes" type="text" /></span>
			<Input label="Nummer des Schildes" type="text" />
			<SelectDirection label="Ausrichtung" />
			<SelectPictogram label="Wegesymbol 1" />
			<SelectPictogram label="Wegesymbol 2" />
			<!-- <Input label="Entfernung" type="text" /> -->
		</div>

		<hr class="border-t border-slate-300 my-2" />

		<div class="w-full grid grid-cols-3 gap-2 items-stretch">
			<span class="col-span-full"><Input label="Name des Ziel 1" type="text" /></span>
			<SelectPictogram label="Pictogramm 1" />
			<SelectPictogram label="Pictogramm 2" />
			<Input label="Entfernung" type="text" />
		</div>

		<hr class="border-t border-slate-300 my-2" />

		<div class="w-full grid grid-cols-3 gap-2 items-stretch">
			<span class="col-span-full"><Input label="Name des Ziel 2" type="text" /></span>
				<SelectPictogram label="Pictogramm 1" />
				<SelectPictogram label="Pictogramm 2" />
				<Input label="Entfernung" type="text" />
			
		</div>
	</div>
</section>
