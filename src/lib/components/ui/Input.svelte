<script lang="ts">
	type Props = {
		value?: string | number
		onchange?: (event: Event) => void
		oninput?: (event: Event) => void
		type: string
		label: string
	}

	let { type = 'text', label, value = $bindable(), oninput, onchange }: Props = $props()
</script>

<div class="flex flex-col text-sm">
	{#if label}
		<label for="input-field" class="block text-xs font-medium text-slate-700 mb-1"
			>{label}</label
		>
	{/if}
	<input
		id="input-field"
		{type}
		class="w-full h-8 rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-500"
		bind:value
		oninput={oninput ? oninput : undefined}
		onchange={onchange ? onchange : undefined}
	/>
</div>
