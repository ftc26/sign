<script lang="ts">
	type Props = {
		value?: string | number
		label: string
	}

	let { label, value = $bindable() }: Props = $props()
</script>

<div class="flex flex-col text-sm">
	{#if label}
		<label for="input-field" class="block text-xs font-medium text-slate-700 mb-1"
			>{label}</label
		>
	{/if}
	<textarea
		id="input-field"
		class="w-full h-24 rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-500"
		bind:value
	></textarea>
</div>