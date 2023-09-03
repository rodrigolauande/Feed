import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post, PostType } from "./components/Post";


import styles from './App.module.css';

import './global.css';


export function App() {

  const posts: PostType[] = [
    {
      id: 1,
      author: {
        avatarUrl: 'https://github.com/rodrigolauande.png',
        name: 'Rodrigo Lauande',
        role: "Web Dev",
      },
      content: [
        { type: 'paragraph', content: 'Fala galeraa 👋'},
        { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
        { type: 'link', content: 'jane.design/doctorcare'},
      ],
      publishedAt: new Date('2023-07-17 13:01:23')
    },
    {
      id: 2,
      author: {
        avatarUrl: 'https://github.com/fran.png',
        name: 'Fran',
        role: "Dev",
      },
      content: [
        { type: 'paragraph', content: 'Fala galeraa 👋'},
        { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
        { type: 'link', content: 'jane.design/doctorcare'},
      ],
      publishedAt: new Date('2023-07-15 19:15:23')
    },
  ]

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
          {posts.map(post => {
            return (
              <Post key={post.id}
              post={post}
              />
            )
          })}
        </main>
      </div>      
    </div>
    )
}
