'use client'
import {getData} from "@/lib/helper"
import { useActionState } from "react"
import classes from "@/app/add/page.module.css"

function AddMenu() {

  const [data,formAction,isPending] = useActionState(getData,{message:""})
  return (
    <main className={classes.blog__adding}>
      <form action={formAction}>
        <label>Названия</label>
        <input type="text" required name="name"/>
        <label>Оценка</label>
        <input type="number" required name="rating"/>
        <label>Комментарий</label>
        <input type="text" required name="comment"/>
        <label className={classes["blog__custom-photo"]} htmlFor="custom-photo">Фото</label>
        <input type="file"  id="custom-photo" name="photo" accept="image/png, image/jpeg" required/>
        <button disabled={isPending}>{isPending ? "Ожидания...":"Отправить"}</button>
      </form>
      {data?.message &&(
        <p className={classes["blog__adding-error"]}>{data?.message}</p>
      )}
    </main>
  )
}

export default AddMenu