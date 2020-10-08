const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const { MongoClient, ObjectId} = require('mongodb');
const db = require('mongodb').MongoClient;
const dbURL = 'mongodb://localhost:27017/notesAPI';
var collection;

async function conectWithMongo(dbURL){
    var clientMongo = await MongoClient.connect(dbURL, {useUnifiedTopology: true});
    collection = await clientMongo.db().collection('notes')
    console.log('**Conectado**')
}
conectWithMongo(dbURL);
const port = 3000;


app.get('/new/', async (req,res)=>{
    /**http://localhost:3000/new/?title=AAAAAA&content=BBBBBB **/
    var titleNew = req.query.title;
    var contentNew = req.query.content;
    var insertNew = await collection.insertOne({
        title: titleNew,
        content: contentNew
    })
    res.send(insertNew.insertedId);
})


app.get('/list/', async (req,res)=>{
    /**http://localhost:3000/list/**/
    var notesAll = await collection.find().toArray()

    var json = JSON.stringify(notesAll)
    res.send(json)
})

/* esta es otra opcion para usar diferente al endpoint update

app.get('/replace/', async (req,res)=>{
    /**http://localhost:3000/replace/?id=''&title=''&content=''*
    var idNew = req.query.id;
    var titleNew = req.query.title;
    var contentNew = req.query.content;

    var filter = {_id:ObjectId(idNew)};
    var document = {
        title: titleNew,
        content: contentNew
    }
    var updateNotes = await collection.replaceOne(filter,document)

    res.send(updateNotes)
})**/

app.get('/update/', async (req,res)=>{
    /**http://localhost:3000/update/?id=''&document={xxx: yyyyy}**/
    var idNew = req.query.id;
    var documentJSON = req.query.document;
    document = JSON.parse(documentJSON);
    console.log(document);
    
    var updateNotes = await collection.updateOne(
            {_id:ObjectId(idNew)},
            {$set:document})

    res.send(updateNotes)
})

app.get('/delete/', async (req, res)=>{
    /**http://localhost:3000/delete/?id=''**/
    var idDelete = req.query.id;
    var deleteNotes = await collection.deleteOne(
     {_id:ObjectId(idDelete)}
     )
    res.send(deleteNotes)
})

app.get('/search/', async(req, res)=> {
    /**http://localhost:3000/search/?title=''**/
    var searchTitle = req.query.title;
    //var searchContent = req.query.content;
    var filtroTitulo = {title: new RegExp(searchTitle,'i')};
    /*var filtroContenido = {content: new Regex(searchContent,'i')};*/

    var searchNotes = await collection.find(filtroTitulo).toArray();
    var json = JSON.stringify(searchNotes)
    res.send(json)
})



app.listen(port,()=>{
    console.log('-> ** L');
    console.log('-> ** i');
    console.log('-> ** s');
    console.log('-> ** t');
    console.log('-> ** o');
})