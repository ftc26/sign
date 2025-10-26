<script lang="ts">
	import { Select } from 'bits-ui'
	import Icon from '@iconify/svelte'
	import { routeSymbols } from '$lib/assets/symbol'

	type Props = {
		customAnchor?: SVGElement | string
	}

	let { customAnchor }: Props = $props()
</script>

<Select.Content
	class="focus-none border-none select-none rounded border px-1 py-1 bg-white max-h-[var(--bits-select-content-available-height)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-hidden z-50 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
	sideOffset={10}
	{customAnchor}
>
	<Select.ScrollUpButton class="flex w-full items-center justify-center">
		<Icon icon="tabler:chevrons-up" class="size-4 text-slate-500" />
	</Select.ScrollUpButton>

	<Select.Viewport class="">
		{#each routeSymbols as symbol, i (i + symbol.value)}
			<Select.Item
				class="rounded flex gap-x-2 h-9 w-full select-none items-center p-3 capitalize text-sm data-highlighted:bg-slate-100 outline-hidden data-disabled:opacity-50 "
				value={symbol.value}
				label={symbol.label}
			>
				{#snippet children({ selected })}
					<div
						class="size-6 flex-none border border-slate-400 flex items-center justify-center"
					>
						<svg class="w-full h-full">
							<defs><symbol.icon /></defs>
							<use href={`#${symbol.value}`} fill="currentColor" />
						</svg>
					</div>

					<span class="truncate flex-auto">{symbol.label}</span>

					<div class="ml-auto">
						{#if selected}
							<Icon icon="tabler:check" class="size-6 flex-none" />
						{:else}
							<div class="size-6 flex-none"></div>
						{/if}
					</div>
				{/snippet}
			</Select.Item>
		{/each}
	</Select.Viewport>

	<Select.ScrollDownButton class="flex w-full items-center justify-center">
		<Icon icon="tabler:chevrons-down" class="size-4 text-slate-500" />
	</Select.ScrollDownButton>
</Select.Content>