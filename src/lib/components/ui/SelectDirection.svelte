<script lang="ts">
	import { Select } from 'bits-ui'
	import Icon from '@iconify/svelte'

	type Props = {
		label?: string
		value?: string
	}

	let { label = 'Richtung', value = $bindable() }: Props = $props()

	const directions: { value: string; label: string; disabled?: boolean; icon?: string }[] = [
		{ value: 'left', label: 'Links', icon: 'tabler:arrow-bar-left' },
		{ value: 'right', label: 'Rechts', icon: 'tabler:arrow-bar-right' },
		// { value: 'both', label: 'Links und Rechts', icon: 'tabler:arrow-bar-both' }
	]

	const selectedLabel = $derived(
		value ? directions.find((symbol) => symbol.value === value)?.label : 'Wähle eine Richtung'
	)
	const selectedIcon = $derived(
		value
			? directions.find((symbol) => symbol.value === value)?.icon || 'tabler:direction-sign-filled'
			: 'tabler:direction-sign-filled'
	)
</script>

<div class="flex flex-col">
	<label for="input-field" class="block text-xs font-medium text-slate-700 mb-1">{label}</label>

	<Select.Root
		type="single"
		onValueChange={(v) => (value = v)}
		items={directions}
		allowDeselect={true}
		open={false}
	>
		<Select.Trigger
			class="h-8 w-full px-2 gap-x-2 rounded border-none inline-flex touch-none select-none items-center text-sm  bg-white data-placeholder:text-slate-400 transition-colors"
			aria-label="Wähle ein Symbol"
		>
			<Icon icon={selectedIcon} class="size-6 flex-none" />
			<span class="truncate flex-auto text-left">{selectedLabel}</span>
			<Icon icon="tabler:chevron-down" class="flex-none size-6" />
		</Select.Trigger>

		<Select.Portal>
			<Select.Content
				class="focus-none border-none select-none rounded border px-1 py-3 bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-hidden z-50 h-96 max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)]  data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
				sideOffset={10}
			>
				<Select.ScrollUpButton class="flex w-full items-center justify-center">
					<Icon icon="tabler:caret-up-filled" class="size-6" />
				</Select.ScrollUpButton>

				<Select.Viewport class="px-2">
					{#each directions as direction, i (i + direction.value)}
						<Select.Item
							class="rounded flex gap-x-2 h-10 w-full select-none items-center p-3 capitalize text-sm data-highlighted:bg-slate-100 outline-hidden data-disabled:opacity-50 "
							value={direction.value}
							label={direction.label}
							disabled={direction.disabled}
						>
							{#snippet children({ selected })}
								<div class="size-6 flex-none">
									<Icon icon={direction.icon || ''} class="size-6 flex-none" />
								</div>

								<span class="truncate flex-auto">{direction.label}</span>

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
					<Icon icon="tabler:caret-down-filled" width="24" height="24" />
				</Select.ScrollDownButton>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
</div>
