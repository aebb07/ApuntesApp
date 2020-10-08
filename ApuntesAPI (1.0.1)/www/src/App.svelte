<script>
	import {firebaseAuth, googleAuthProvider} from './authFirebase';
	import Modal from "./Modal.svelte";
	import DarkMode from "./DarkMode.svelte";


	var user;
	var title = '';
	var content = '';
	var notes = [];
	const colorClass = ['color1','color2','color3','color4']
	var busquedaT = '';
	var showModal = false;
	var modalNoteIdx; 


firebaseAuth.onAuthStateChanged(function(usr) {
	if (usr) {
		user = usr;
	} else {
		user = null;
	}
});

function loginWithRedirect () {
	firebaseAuth.signInWithRedirect(googleAuthProvider).then(
			result=>{
				var token = result.credential.accessToken;
				user = result.user;
				console.log('User arrives:', user)
			}
		)
		.catch(
			err=>console.error(err)
		);
}

function logout () {
	firebaseAuth.signOut()
		.then(
			console.log('User leave.')
		)
		.catch(
			err=>console.error(err)
		);
}


//mostrar modal
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
	{#if user}
	<h2 id="holaUser">!Hola! {user.displayName}</h2>
	<img id="imgUser" alt="User picture" src={user.photoURL}>
	<button id="out" on:click={logout}>Sign out</button>
	{:else}
	<button id="loginbutton" on:click={loginWithRedirect}>Sign in</button>
	{/if}
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
		margin: auto;
		height: 100vh;
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
		display: inline-block;
		padding: 20px;
		font-size: 17px;
		color: whitesmoke;
		background-color:transparent;
		margin-left:6px;
	}

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
		width: 35%;
		margin: auto;
	}

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

#imgUser {
    border-radius: 50%;
    height: 40px;
	float: right;
	margin-top: 16px;
	margin-left: 16px;
	margin-right: 16px;
}

#out {
	font-size: 12px;
	background: none;
	border: none;
	color: #f5f5f5;
	float: right;
	line-height: 60px;
}

#loginbutton {
	font-size: 12px;
	background: none;
	border: none;
	color: #f5f5f5;
	margin-right: 20px;
	float: right;
	line-height: 60px;
}

#holaUser {
	font-size: 12px;
	color: #f5f5f5;
	font-weight: normal;
	line-height: 50px;
	margin-right: 20px;
	float: right;
}

	
	@media only screen and (max-width: 360px) {

		nav {
			z-index: 1;
		}

		input[type=search] {
			font-size: 1rem;
			width: 13rem;
		}

		#icon {
			display: none;
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

		#loginbutton {
			margin-right: 10px;
			line-height: 55px;
		}

		#holaUser {
			display: none;
		}

		#imgUser {
			margin-left: 10px;
			margin-right: 14px;
		}

		#out {
			line-height: 55px;
		}
	}
	

</style>

