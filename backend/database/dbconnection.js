import mongoose from "mongoose";

export const dbConnect =()=>{
    mongoose.connect('mongodb+srv://22je0094:6fUKORytz4DEB9cr@cluster0.rz6z7c1.mongodb.net/').then(()=>{
        console.log("db Connected");
    })
    .catch((err)=>{
console.log(`munna err aa gya ${err}`)
    })
}