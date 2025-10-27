<script>
	import Footer from '$lib/components/layout/Footer.svelte'
	import Header from '$lib/components/layout/Header.svelte'
	import Previews from '$lib/components/layout/Previews.svelte'
	import Edit from '$lib/components/layout/Edit.svelte'
	import { PaneGroup, Pane, PaneResizer } from 'paneforge'
</script>

<div class="flex flex-col h-screen bg-slate-50 text-slate-800">
	<Header />
	<PaneGroup direction="horizontal" class="flex flex-auto overflow-hidden px-4 ">
		<Pane defaultSize={30} class="h-full">
			<Edit />
		</Pane>
		<PaneResizer
		class="my-2 w-4 border-6 border-slate-50 bg-transparent transition-colors duration-200 hover:bg-slate-500 data-[active]:bg-slate-500"
	/>
		<Pane class="h-full">
			<Previews />
		</Pane>
	</PaneGroup>
	<Footer />
</div>
