<script>
	import Footer from '$lib/components/layout/Footer.svelte'
	import Header from '$lib/components/layout/Header.svelte'
	import Previews from '$lib/components/layout/Previews.svelte'
	import Edit from '$lib/components/layout/Edit.svelte'
</script>

<div class="flex flex-col h-screen bg-slate-50 text-slate-800">
	<Header />
	<div class="flex flex-auto overflow-hidden px-4 gap-x-4">
		<Edit />
		<Previews />
	</div>
	<Footer />
</div>
