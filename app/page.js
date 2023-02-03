import AudioPlayer from './(components)/AudioPlayer'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <AudioPlayer />
      </main>
    </div>
  )
}
