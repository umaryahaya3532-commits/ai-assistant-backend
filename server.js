const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


const HF_TOKEN = process.env.HF_TOKEN;


app.post("/chat", async (req, res) => {

    try {

        const message = req.body.message;


        const response = await fetch(
            "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct",
            {

                method: "POST",

                headers: {
                    "Authorization": "Bearer " + HF_TOKEN,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    inputs: message,
                    parameters: {
                        max_new_tokens: 200
                    }
                })

            }
        );


        const data = await response.json();


        res.json(data);


    } catch(error) {

        res.json({
            error: "An samu matsala wajen haɗawa da AI"
        });

    }

});


app.get("/", (req,res)=>{
    res.send("AI Assistant Server yana aiki");
});


app.listen(3000, ()=>{

    console.log("Server yana aiki a port 3000");

});
