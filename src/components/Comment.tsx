import styles from './Comment.module.css'
import { Trash, ThumbsUp } from '@phosphor-icons/react'
import { Avatar } from './Avatar'
import { useState } from 'react'

interface CommentProps {
    content: string;
    onDeleteComment: (comment: string) => void
}

export function Comment({content, onDeleteComment}: CommentProps) {

    const [likeCount, setLikeCount] = useState(0);

    function handleDeleteComment () {
        console.log('Deletado!!!')

        onDeleteComment(content);
    }

    function handleLikeComment () {
        setLikeCount((state) => {
            return state + 1
        });

        // 2º opcão setLikeCount(likeCount + 1)

        //setLikeCount((state) => {
            //return state + 1
        //});
        //setLikeCount((state) => {
            //return state + 1
        //});
    }

    return(
        <div className={styles.comment}>
            <Avatar hasBorder={false} src='https://github.com/rodrigolauande.png' alt="" />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Rodrigo Lauande</strong>
                            <time title='15 de julho de 2023 às 19:14:23'dateTime='2023-07-15 19:14:23'>Cerca de 1h atrás</time>
                        </div>
                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <Trash size={24} />
                        </button>
                    </header>
                    {/*<p>Muito bom Dev, parabens!!! 👋👋</p>*/}
                    <p>{content}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}