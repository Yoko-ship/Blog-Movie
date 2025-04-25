import Link from "next/link"
import "@/css/header.css"
function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
              <Link href="/">Главное меню</Link>
          </li>
          <li>
              <Link href="/add">Добавить</Link>
          </li>
          <li>
              <Link href="/tierlist">Тир-Лист</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header