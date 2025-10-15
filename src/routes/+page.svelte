<script>
	import Footer from '$lib/components/layout/Footer.svelte'
	import Header from '$lib/components/layout/Header.svelte'
	import PreviewJson from '$lib/components/layout/PreviewJson.svelte'
	import Edit from '$lib/components/layout/Edit.svelte'
</script>

<div class="flex flex-col h-screen text-slate-800">
	<Header />
	<div class="flex flex-auto overflow-hidden">
		<Edit />
		<PreviewJson />
	</div>
	<Footer />
</div>
