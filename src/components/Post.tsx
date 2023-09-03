import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';


import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
   type: 'paragraph' | 'link';
   content: string;
}

export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface PostProps {
    post: PostType;
}
export function Post({ post }: PostProps) {

    const [comments, setComments] = useState(['post legal'])

    const [newCommentText, setNewCommentText] = useState('')

    console.log(newCommentText)
    function handleCreateNewComment(event: FormEvent)  {
        event.preventDefault();
        
        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }
    
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value);
    }
    
    function handleNewCommentInvalid (event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment != commentToDelete
        })
        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommetEmpty = newCommentText.length == 0

    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })
    //const publishedDateFormatted = new Intl.DateTimeFormat('pt-BR', { //mdn intl datetimeformat ou instalar o date-fns (npm i date-fns)
        //day: '2-digit',
        //month: 'long',
        //hour: '2-digit',
        //minute: '2-digit',
    //}).format(publishedAt);

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {/*<p>
                    <p>Fala galeraa 👋</p>
                    <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>
                    <p><a href=''>jane.design/doctorcare</a></p>
                    <p>
                        <a href=''>#novoprojeto</a>{' '}
                        <a href=''>#nlw</a>{' '}
                        <a href=''>#rocketseat</a>
                    </p>
                </p>*/}
                {post.content.map(line => {
                    if (line.type === 'paragraph') {
                    return <p key={line.content}>{line.content}</p>;
                } else if (line.type === 'link') {
                    return <p key={line.content}><a href='#'>{line.content}</a></p>;
                }
            })}
            </div>
            
            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu Feedback</strong>

                <textarea
                    name='comment'
                    placeholder='Deixe seu comentário...'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type='submit' disabled={isNewCommetEmpty}>
                        Publicar</button>
                </footer>

            </form>
            
            <div className={styles.commentList}>
                {/*<Comment/>
                <Comment/>
                <Comment/>*/}

            {comments.map(comment => {
                return (
                    <Comment 
                        key={comment} 
                        content={comment} 
                        onDeleteComment={deleteComment}
                    />
                )
            })}
            </div>
        </article>
        
    )
}