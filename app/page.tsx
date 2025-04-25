import data from "@/datas.json"
import { MainMenu } from "@/components/MainMenu";
import classes from "./page.module.css"

export default function Home() {
  return (
    <>
    <main className={classes.blog}>
      <MainMenu data={data}/>
    </main>
    </>
  );
}
