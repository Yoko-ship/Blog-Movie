'use server'
import { readFile } from "fs/promises";
import { writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import path from "path";

interface TierData{
    S: never[];
    A: never[];
    B: never[];
    C: never[];
    D: never[];
    Images: {
        id: string;
        name: string;
        rating: string;
        comment: string;
        imageName: string;
    }[];
}

export const getData = async(_prevState:{message:string},formData:FormData) =>{
    console.log('ds')
    const name = formData.get("name") as string
    const rating = formData.get("rating") as string
    const comment = formData.get("comment") as string
    const photo = formData.get("photo") as File
    const id = nanoid(6)    
    if(!name || !rating || !comment || !photo){
        return {message:"Пожалуста заполните все поля"}
    }

    const bytes = await photo.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const uploadDir = path.join(process.cwd(),"public/images")
    const filePath = path.join(uploadDir,photo.name)
    await writeFile(filePath,buffer)
    const dataUpload = path.join(process.cwd(),"datas.json")
    let existingData:any[] = []
    try{
        const jsonData = await readFile(dataUpload,"utf-8")
        existingData = JSON.parse(jsonData)
    }catch{
        existingData = []
    }
    const imageName = photo.name
    const newEntry = {id,name,rating,comment,imageName}
    existingData.push(newEntry)
    await writeFile(dataUpload,JSON.stringify(existingData,null,2),"utf-8")
    await saveNewImage()
    redirect("/")
}

export const deleteData = async(id:string) =>{
    const file = await readFile("datas.json")
    const stringedValue = file.toString()
    const objectValue = JSON.parse(stringedValue)
    const updatedValue = objectValue.filter((item:any) => item.id !== id)
    await writeFile("datas.json",JSON.stringify(updatedValue,null,2),"utf-8")
}

export const saveTierData = async(items:TierData)=>{
    await writeFile("tierData.json",JSON.stringify(items,null,2),"utf-8")
}

export const saveNewImage = async()=>{  
    const file = await readFile("datas.json")
    const stringedValue = file.toString()
    const objectValue = JSON.parse(stringedValue)

    const secondFile = await readFile("tierData.json")
    const secondStringedValue = secondFile.toString()
    const secondObjectValue = JSON.parse(secondStringedValue)

    objectValue.forEach((item:any) =>{
        const isItemInTiers = 
        secondObjectValue.S.some((tierItem:any) => tierItem.imageName === item.imageName) ||
        secondObjectValue.A.some((tierItem:any) => tierItem.imageName === item.imageName) ||
        secondObjectValue.B.some((tierItem:any) => tierItem.imageName === item.imageName) ||
        secondObjectValue.C.some((tierItem:any) => tierItem.imageName === item.imageName) ||
        secondObjectValue.D.some((tierItem:any) => tierItem.imageName === item.imageName);

        if(!isItemInTiers){
            secondObjectValue.Images.push(item)
        }
    })
    await writeFile("tierData.json",JSON.stringify(secondObjectValue,null,2),"utf-8")

}