<script>
	import Modal from "./Modal.svelte";
	import DarkMode from "./DarkMode.svelte";
	var title = '';
	var content = '';
	var notes = [];
	const colorClass = ['color1','color2','color3','color4']
	var busquedaT = '';
	var showModal = false;
	var modalNoteIdx; 

	

async function show(noteIdx) {
	modalNoteIdx = noteIdx;
	showModal = true;
}


async function addNew () {
	var url = `http://localhost:3000/new/?title=${title}&content=${content}`;
	var resp = await fetch(url);
	refresh();
	cleanInput()
}

async function cleanInput () {
	content = ''
	title = ''
}


async function refresh () {
	var url = 'http://localhost:3000/list/';
	var resp = await fetch(url);
	notes = await resp.json();
}


async function del(id) {
	var url = `http://localhost:3000/delete/?id=${id}`;
	var resp = await fetch(url);
	refresh();
}

async function searchT(title) {
	var url = `http://localhost:3000/search/?title=${title}`;
	var resp= await fetch(url);
	notes = await resp.json();
}

refresh();


</script>

<main>
<nav>
	<i id="icon" class="fas fa-search"></i>
	<input class="searching" type="search" placeholder="Buscar en tus notas" bind:value={busquedaT} on:input={()=>{searchT(busquedaT)}}>
</nav>



<div  class="vh">

	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.14.0/css/all.css" integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,800;1,600&display=swap" rel="stylesheet"> 
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0, user-scalable=0">

	<div class="texto">
		<h1>Tus notas</h1>
	</div>

		{#each notes as item, idx}
	<div class="container">
			<div class={'notes-container ' + colorClass[idx%4]} on:click={() => show(idx)}>

					<input placeholder='Titulo' bind:value={item.title} readonly>
					<textarea class="scroll" placeholder= 'Contenido' bind:value={item.content} readonly></textarea>
			</div>

				<div class="buttondel">
					<button id="delete" on:click={()=>{del(item._id)}}><i class="fas fa-trash-alt"></i></button>
				</div>

	</div>

		{#if showModal}	
			<Modal bind:notes bind:modalNoteIdx bind:showModal colorClass={colorClass} />
		{/if}
			
		{/each}




<footer>
	<div id="add-notes">
		<DarkMode>
			<i class="fas fa-moon"></i>
		</DarkMode>
		<button id="add" on:click={addNew}><i class="fas fa-plus-square"></i></button>
	</div>
</footer>
</main>





<style>
	main {
		font-family: 'Poppins';
	}

	nav {
		display: inline-block;
		background-color: #292929;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
	}


	input[type=search] {
		display: flex;
		padding: 20px;
		font-size: 17px;
		width: 1160px;
		color: whitesmoke;
		background-color:transparent;
		margin: auto;
		float: right;
	}

	/*input[type=search]:focus{
		background-color: #9b9898;
	}*/


	#icon {
		font-size: 25px;
		margin-left: 20px;
		color: #9b9898;
		margin-top: 20px;

	}

	.texto {
		display: flex;
		width: 100%;
		padding-top: 3rem;
		padding-left: 2rem;
	}

	h1 {
			font-size: 11px;
			font-weight: 500;
			text-transform: uppercase;	
			color: #acacac;	
		}

	
    .vh {
		display: flex;
    	flex-direction: row;
    	flex-wrap: wrap;
		padding-top: 40px;
	}


	.container {
		display:flex;
		width: 333px;
		padding: 15px 20px 12px;
		padding-right: 20px;
		padding-right: 12px;
		font-size: 14px;
		padding-right: 0;
		padding-top: 30px;
	}

	.notes-container {
		display:flex;
		flex-direction: column;
		padding: 15px;
		border-radius: 10px;
	}


	
	input {
		border: none;
		outline: none;
		background-color: transparent;
		color: #444444;
	}


	textarea {
		border: none;
		resize: none;
		outline: none;
		background-color: transparent;
		color: #444444;
		overflow: hidden;
	}


	.buttondel {
		position: relative;
		right: 35px;
	}

	button#delete {
		display: none;
		border: none;
		justify-content: center;
		font-size: 15px;
		background: transparent;	
	}

	.container:hover #delete {
		cursor: pointer;
		display: block;
	}

	#add-notes {
		display: flex;
		padding: 10px;
		width: 30%;
		margin: auto;
	}

	/*#add:hover {
		cursor: pointer;
		font-size: 30px !important;
		padding-right: 36px;
		padding-bottom: 10px;
		padding-top: 10px;
		box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.50);
		border: 1px solid #444;
	}*/

	button#add {
		font-size: 30px;
		color: #797676;
		background-color: transparent;
		border: none;
		margin: auto;
		padding: 0;
	}

	footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: #242424;
	}

	.modal-content {
		opacity: 0;
		pointer-events: none;
		transition: all 2s;
		background-color: rgba(0,0,0,.8);
		position:fixed;
		top:0;
		right:0;
		bottom:0;
		left:0;  
	}

	.modal-content:target {
		opacity: 1;
		z-index: 1;
		pointer-events: auto;
	}

	:global(body) {
		background-color: whitesmoke;
		transition: background-color 0.3s
	}

	:global(body.dark-mode) {
		background-color: #292929;
		color: #797676;
	}

	
	@media only screen and (max-width: 360px) {
		input[type=search] {
			font-size: 1rem;
			width: 20rem;
		}

		#icon {
			width: 1rem;
			font-size: 1rem;
		}

		.container {
			padding: 15px 0px 10px 13px;
		}

		.texto {
			display: flex;
			width: 100%;
			padding-top: 2rem;
			padding-left: 1rem;
	}

		h1 {
			font-size: 11px;
			font-weight: 500;
			text-transform: uppercase;	
			color: #acacac;	
		}

		footer {
			background-color: #242424;
		}

		#add-notes {
			width: 44%;
			padding: 0;
		}

	    #delete {
			cursor: pointer;
			display: block !important;
		}
	}
	

</style>

