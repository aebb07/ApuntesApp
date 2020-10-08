<script>
    export var showModal;
    export var modalNoteIdx;
    export var notes;
    export var colorClass;
    var classe;
    $: classe = `modal ${colorClass[modalNoteIdx%colorClass.length]}`
    async function hide() {
        showModal = false;
    }

    async function update (id,property,value) {
        var document = {};
        document[property] = value;
        var json = JSON.stringify(document)
        console.log(json)
        var url = `http://localhost:3000/update/?id=${id}&document=${json}`;
        var resp = await fetch(url);
    }
</script>

<style>
    .modal-wrapper {
        background-color: rgba(0,0,0,0.2);
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .modal {
        max-width: 50vw;
        margin: 15% auto;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        border-radius: 10px;
    }

    .close {
        cursor: pointer;
        position: relative;
        left: 37rem;
        bottom: 0.6rem;
        font-size: 25px;
        margin-bottom: -15px;
        color: #242424;
    }

    .close:hover {
        font-weight: bold;
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
	}

    @media only screen and (max-width: 360px) { 
        .close {
            left: 18rem;
        }

        .modal {
            max-width: 100vh;
            margin-top: 200px;
        }
    }
</style>

<div class="modal-wrapper">
    <div class={classe} >
        <span class="close" on:click={() => hide()}>&times;</span>
                <input placeholder='Titulo' bind:value={notes[modalNoteIdx].title} on:keyup={e=>{update(notes[modalNoteIdx]._id,'title',notes[modalNoteIdx].title)}}>
                <textarea class="scroll" placeholder= 'Contenido' cols="20" rows="4"  bind:value={notes[modalNoteIdx].content} on:keyup={e=>{update(notes[modalNoteIdx]._id,'content',notes[modalNoteIdx].content)}}></textarea>
    </div>
</div>
