
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();


const apikey=process.env.SHOPIFY_APIKEY;
const apisecret=process.env.SHOPIFY_API_SECRET;
const apitoken=process.env.SHOPIFY_API_TOKEN_PASS;
const endpoint="myecommweb.myshopify.com";
const fullurl=`https://${apikey}:${apitoken}@${endpoint}/admin/api/2024-01`
console.log(fullurl)
exports.getProducts = async (req,res) =>{

await axios.get(`${fullurl}/products.json`).then((response)=>{
    data = response.data;
    res.json({ message: 'Request received!', data })
 
}).catch((err)=>{
    res.send(err);
})
}
exports.getProductsbyid = async (req,res) =>{
const id = req.params.id;
    await axios.get(`${fullurl}/products/${id}.json`).then((response)=>{
        data = response.data;
        res.json({ message: 'Request received!', data })
     
    }).catch((err)=>{
        res.send(err);
    })
    }
exports.postProducts = async (req,res) =>{
   
await axios({
        method: 'post',
        url: `${fullurl}/products.json`,
        headers: {'Content-Type' : 'application/json'},
        data: JSON.stringify(req.body)
    })
  
    .then((response)=>{
      
        res.json({"data posted":response.data})
      
     
    }).catch((err)=>{
        console.log(err)
        res.send(err.response.data.errors);
    })
    }
    



    exports.putProducts = async (req,res) =>{

   
        const id = req.params.id;
        console.log(id)
    await axios({
            method: 'put',
            url: `${fullurl}/products/${id}.json`,
            headers: {'Content-Type' : 'application/json'},
            data: JSON.stringify(req.body.data)
        }).then((response)=>{
          
            res.json({"data posted":response.data})
          
         
        }).catch((err)=>{
            console.log(`${fullurl}/products/${id}.json`)
            console.log(data)
            res.send(err);
        })
        }

        exports.delProducts = async (req,res) =>{

            const id = req.params.id;
      
            await axios({
                    method: 'delete',
                    url: `${fullurl}/products/${id}.json`       
                }).then((response)=>{
                  
                    res.json({"data delete":response.data})
                  
                 
                }).catch((err)=>{
                   
                    res.send(err);
                })
                }

                exports.getOrders = async (req,res) =>{

                    await axios.get(`${fullurl}/orders.json`).then((response)=>{
                        data = response.data;
                        res.json({ message: 'Orderr fetched!', data })
                     
                    }).catch((err)=>{
                        res.send(err);
                    })
                    }

                    exports.postOrders = async (req,res) =>{
   
                        await axios({
                                method: 'post',
                                url: `${fullurl}/orders.json`,
                                headers: {'Content-Type' : 'application/json'},
                                data: JSON.stringify(req.body)
                            }).then((response)=>{
                              
                                res.json({"order posted":response.data})
                              
                             
                            }).catch((err)=>{
                                console.log(err)
                                res.send(err);
                            })
                            }
                            exports.putOrders = async (req,res) =>{

   
      
                                await axios({
                                        method: 'put',
                                        url: `${fullurl}/orders/${req.body.order_id}.json`,
                                        headers: {'Content-Type' : 'application/json'},
                                        data: JSON.stringify(req.body.data)
                                    }).then((response)=>{
                                      
                                        res.json({"order updated":response.data})
                                      
                                     
                                    }).catch((err)=>{
                                     
                                        res.send(err);
                                    })
                                    }
                                    exports.cancelOrders = async (req,res) =>{

   
      
                                        await axios({
                                                method: 'post',
                                                url: `${fullurl}/orders/${req.body.order_id}/cancel.json`,
                                                headers: {'Content-Type' : 'application/json'}
                                            }).then((response)=>{
                                              
                                                res.json({"order cancelled":response.data})
                                              
                                             
                                            }).catch((err)=>{
                                             
                                                res.send(err);
                                            })
                                            }
                                            exports.delOrders = async (req,res) =>{

   
      
                                                await axios({
                                                        method: 'delete',
                                                        url: `${fullurl}/orders/${req.body.order_id}.json`       
                                                    }).then((response)=>{
                                                      
                                                        res.json({"order deleted":response.data})
                                                      
                                                     
                                                    }).catch((err)=>{
                                                       
                                                        res.send(err);
                                                    })
                                                    }