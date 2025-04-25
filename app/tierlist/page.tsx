import TierList from "@/components/Tier"
import classes from "./page.module.css"
export default function TierListPage(){

    return (
        <>
        <main className={classes.main}>
        <TierList/>
        </main>
        </>
    )
}