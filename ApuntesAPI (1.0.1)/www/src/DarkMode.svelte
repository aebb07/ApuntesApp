<script>
 function toggle() {
	window.document.body.classList.toggle('dark-mode')
}
    
</script>

<button class = "dark" on:click={toggle}>
	<slot/>
</button>

<style>
   .dark{
		background:transparent;
		color: #797676;
		border: none;
        font-size: 30px;
        margin: auto;

	}

	:global(body.dark-mode) button {
		background:transparent;
		color:#797676;
		border: none;
	}


</style>