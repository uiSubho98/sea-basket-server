require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
app.use(express.json())
app.use(cors())



const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = "mongodb+srv://sea-basket:OMjSulZMcEojGlNg@cluster0.rt4fa.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
    try{
        await client.connect();
        console.log('db connected')
        const bannerCollection = client.db('Sea-Basket').collection("banner");
        const glanceCollection = client.db('Sea-Basket').collection("product_Glance");
        const categoriesCollection = client.db('Sea-Basket').collection("categories");
        const faqCollection = client.db('Sea-Basket').collection("faq");
        const readTopicsCollection = client.db('Sea-Basket').collection("Read_Topics");
        const blogTopicsCollection = client.db('Sea-Basket').collection("Blog_Topics");
        const adminCollection = client.db('Sea-Basket').collection("admin");

        app.get('/banner',async(req,res)=>{
            const query={};
            const cursor = bannerCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/categories',async(req,res)=>{
            const query={};
            const cursor = categoriesCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/glance',async(req,res)=>{
            const query={};
            const cursor = glanceCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/faq',async(req,res)=>{
            const query={};
            const cursor = faqCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/readTopics',async(req,res)=>{
            const query={};
            const cursor = readTopicsCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/blogTopic',async(req,res)=>{
            const query={};
            const cursor = blogTopicsCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })
        app.post('/admin',async(req,res)=>{
            const adminDetails= req.body;
            // console.log(adminDetails.email);
            const query = { email: adminDetails.email,password:adminDetails.password }
            console.log(query);
            const result = await adminCollection.findOne(query)
            console.log(result);
            res.send(result)
        })
        app.delete('/categories/:id',async(req,res)=>{
            const id = req.params.id;
            console.log(id)
            const query = {_id:ObjectId(id)};
            const result= await categoriesCollection.deleteOne(query);
            res.send(result)
        })

        //Edit category
        app.put('/categoryForm/:id',async(req,res)=>{
            const id = req.params.id;
            console.log(id);
            const categories=req.body;
            console.log(categories);
            const filter={_id:ObjectId(id)};
            console.log(filter);
          const options = { upsert: true };
          const updateDoc = {
            $set:categories,
          };
          const result = await categoriesCollection.updateOne(filter,updateDoc,options)
          console.log(result);
          res.send(result)
        
        })

        app.post('/newcategories',async(req,res)=>{
            const addCategory = req.body;
            // console.log(addProduct)
            const result = await categoriesCollection.insertOne(addCategory)
            res.send(result)
        })



       
    }
    finally{

    }
}
run().catch(console.dir)

app.get('/',(req,res)=>{
  res.send('hello sea-basket')
})
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })